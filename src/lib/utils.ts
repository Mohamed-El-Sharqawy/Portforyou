import cookie from "js-cookie";

import { clsx, type ClassValue } from "clsx";
import { jwtDecode } from "jwt-decode";
import { twMerge } from "tailwind-merge";

// Tailwind Merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get Token
export function getToken() {
  const token = cookie.get("token");
  const decodedToken = jwtDecode(token!) as { userId: string };

  return { decodedToken, token };
}
