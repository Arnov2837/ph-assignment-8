"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(
          error.message || error.statusText || "Login failed"
        );
      } else if (data) {
        toast.success("Login success");
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f1eb]">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow">

        <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
        <p className="text-gray-500 mb-6">
          Log in to continue borrowing books.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm font-medium">Password</label>
            <input
              name="password"
              type={show ? "text" : "password"}
              required
              className="w-full mt-1 p-3 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-3 top-[45px] cursor-pointer text-gray-500"
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-orange-500 to-yellow-400 hover:opacity-90 transition cursor-pointer"
          >
            {loading ? "Logging..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google */}
        <button
          type="button"
          disabled={googleLoading}
          onClick={async () => {
            setGoogleLoading(true);
            try {
              const { error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
              });
              if (error) {
                toast.error(
                  error.message ||
                    "Google sign-in failed. Check GOOGLE_CLIENT_ID / secret and redirect URIs."
                );
              }
            } catch (err) {
              toast.error(err?.message || "Google sign-in failed");
            } finally {
              setGoogleLoading(false);
            }
          }}
          className="w-full border py-3 rounded-lg hover:bg-gray-50 transition cursor-pointer disabled:opacity-60"
        >
          {googleLoading ? "Redirecting…" : "Continue with Google"}
        </button>

        <p className="text-center mt-6 text-sm text-gray-500">
          New here?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-orange-500 cursor-pointer font-medium"
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}