import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = (await cookies()).get("token")?.value;
  
  // Check if this is the specific URL pattern to bypass
  const isSpecificTemplateUrl = 
    request.nextUrl.pathname === "/templates/arik" && 
    request.nextUrl.searchParams.get("userId");
    
  // Check if this is the contact page URL pattern to bypass
  const isContactPageUrl = 
    request.nextUrl.pathname === "/templates/arik/contact" && 
    request.nextUrl.searchParams.has("userId");

  if (
    !token &&
    request.nextUrl.pathname !== "/sign-in" &&
    request.nextUrl.pathname !== "/sign-up" &&
    !isSpecificTemplateUrl &&
    !isContactPageUrl
  )
    return NextResponse.redirect(new URL("/sign-in", request.url));

  if (
    token &&
    (request.nextUrl.pathname === "/sign-in" ||
      request.nextUrl.pathname === "/sign-up")
  ) {
    return NextResponse.redirect(new URL("/survey", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/survey/:path*", "/templates/:path*", "/sign-in", "/sign-up"],
};
