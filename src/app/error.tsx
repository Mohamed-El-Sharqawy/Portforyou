'use client';

import { useEffect } from 'react';
import cookie from "js-cookie";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Something went wrong!
          </h2>
          <div className="mt-4 text-gray-600">
            <details className="whitespace-pre-wrap">
              <summary className="text-red-600 cursor-pointer hover:underline">
                Error Details
              </summary>
              <pre className="mt-2 text-sm bg-gray-100 p-4 rounded-md overflow-auto">
                {error.message}
                {error.stack}
              </pre>
            </details>
          </div>
          <button
            onClick={reset}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Try again
          </button>
          <button
            onClick={() => {
              cookie.remove("token");
              window.location.href = "/";
            }}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
