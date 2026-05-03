"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";

export default function Hero() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <section className="relative bg-[#f6f2ea] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/40 via-yellow-100/20 to-transparent blur-2xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-orange-500 text-sm mb-4 font-medium">
            ✦ Welcome to Mango Library
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-[#2d1f15]">
            Discover Your{" "}
            <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
              Next Story
            </span>
          </h1>

          <p className="text-gray-600 mt-6 max-w-lg text-lg leading-relaxed">
            Explore powerful ideas, timeless stories, and knowledge that moves you forward.
          </p>

          <div className="flex gap-4 mt-8">
            <Link
              href="/books"
              className="px-7 py-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold shadow-md hover:scale-105 transition"
            >
              Browse Now →
            </Link>

            {!user ? (
              <Link
                href="/register"
                className="px-7 py-3 rounded-full bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-100 transition"
              >
                Create Account
              </Link>
            ) : (
              <Link
                href="/profile"
                className="px-7 py-3 rounded-full bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-100 transition"
              >
                My Profile
              </Link>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="bg-gradient-to-br from-yellow-200 to-orange-200 p-6 rounded-[40px] shadow-xl"
          >
            <img src="/hero-books.jpg" className="w-[380px]" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}