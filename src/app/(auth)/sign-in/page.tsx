"use client";

import Image from "next/image";
import Link from "next/link";
import cookie from "js-cookie";

import { useState } from "react";
import { signin } from "@/features/auth/signin/services/signin";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setIsLoading(true);

    try {
      const res = await signin(formData);

      if (res.errors?.length > 0) {
        // For login errors, we can directly use the message
        setFormError(res.errors[0].message);
      } else if (res?.data?.login) {
        // Store Token in Cookies
        cookie.set("token", res.data.login.token, {
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        // Redirect to templates page
        window.location.href = "/survey";
      }
    } catch (error) {
      setFormError("An unexpected error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-[120px] min-h-screen flex items-center justify-center bg-[rgb(2,8,23)] px-4">
      <div className="w-full max-w-md space-y-8 bg-[rgb(2,8,30)] border border-primary/25 p-6 rounded-lg">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/favicon.ico"
              alt="Portforyou Logo"
              width={48}
              height={48}
              className="rounded-xl"
            />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Sign in to Portforyou
          </h2>
          <p className="text-gray-400">
            Welcome back! Please sign in to continue
          </p>
        </div>

        {formError && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-500 text-sm text-center">{formError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-300 mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                aria-label="Enter your email address"
                required
                disabled={isLoading}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your email address"
                data-cy="email-signin"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                disabled={isLoading}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your password"
                data-cy="password-signin"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            data-cy="submit-signin-btn"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Continue"
            )}
          </button>

          <p className="text-center text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              data-cy="sign-up-btn"
              href="/sign-up"
              className="text-blue-500 hover:text-blue-400"
            >
              Sign up
            </Link>
          </p>

          <div className="flex items-center justify-center">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-500 hover:text-blue-400"
            >
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
