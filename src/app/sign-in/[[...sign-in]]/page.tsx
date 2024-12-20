"use client";

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section data-cy="sign-in" className="section min-h-screen flex items-center justify-center">
      <SignIn />
    </section>
  );
}
