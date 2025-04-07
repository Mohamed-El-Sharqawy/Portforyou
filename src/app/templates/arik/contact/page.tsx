"use client";

import Header from "@/features/(templates)/arik/components/Header/Header";
import { getToken } from "@/lib/utils";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";


export default function Contact() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  useEffect(() => {
    const { decodedToken } = getToken();

    console.log(decodedToken.userId, userId);

    if (decodedToken.userId == userId) {
      toast.success(
        "This page is for the client and you don't need to change anything here.",
        { duration: 30000, position: "top-right", id: "contact-notification" }
      );
    }
  }, [userId]);

  return (
    <section className="arik-template overflow-x-hidden bg-black text-wheat min-h-screen font-arial flex items-center justify-center">
      <Header />

      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            Get in Touch
          </h1>
          <p className="text-lg text-center mb-12 text-wheat/80">
            Let&apos;s discuss your next project
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-wheat/10 border border-wheat/20 rounded-lg focus:outline-none focus:border-wheat/40 transition-colors"
                  placeholder="Your name"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-wheat/10 border border-wheat/20 rounded-lg focus:outline-none focus:border-wheat/40 transition-colors"
                  placeholder="Your email"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-3 bg-wheat/10 border border-wheat/20 rounded-lg focus:outline-none focus:border-wheat/40 transition-colors"
                placeholder="Subject of your message"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-4 py-3 bg-wheat/10 border border-wheat/20 rounded-lg focus:outline-none focus:border-wheat/40 transition-colors resize-none"
                placeholder="Your message"
              ></textarea>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <button
                type="submit"
                className="px-8 py-3 bg-wheat text-black font-medium rounded-lg hover:bg-wheat/90 transition-colors inline-flex items-center space-x-2"
              >
                <span>Send Message</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
