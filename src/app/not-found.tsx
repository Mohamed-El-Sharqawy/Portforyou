"use client";

export default function NotFound() {
  return (
    <section className="h-screen flex items-center justify-center flex-col gap-4 p-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold text-center">Page Not Found</h2>
      <p className="text-muted-foreground text-center max-w-md">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might
        have been moved or doesn&apos;t exist.
      </p>

      <button
        onClick={() => window.history.back()}
        className="text-white mt-4 inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        Return Home
      </button>
    </section>
  );
}
