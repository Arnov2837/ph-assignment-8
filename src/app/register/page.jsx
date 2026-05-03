"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must include uppercase letter")
    .regex(/[a-z]/, "Must include lowercase letter")
    .regex(/[0-9]/, "Must include number")
    .regex(/[^A-Za-z0-9]/, "Must include special character"),
  image: z.string().optional(),
});

export default function Register() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const form = e.target;

    const formData = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      image: form.image.value?.trim(),
    };

    const result = schema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        ...(formData.image ? { image: formData.image } : {}),
      });

      if (error) {
        toast.error(error.message || "Registration failed");
      } else if (data) {
        toast.success("Account created");
        router.push("/login");
        router.refresh();
      }
    } catch (err) {
      toast.error(err?.message || "Registration failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f1eb]">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow">
        <h2 className="text-3xl font-bold mb-2">Create your account</h2>
        <p className="text-gray-500 mb-6">Join Mango Library in seconds.</p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              name="name"
              className={`w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-orange-400"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              className={`w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-orange-400"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Photo URL</label>
            <input
              name="image"
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="relative">
            <label className="text-sm font-medium">Password</label>
            <input
              name="password"
              type={show ? "text" : "password"}
              className={`w-full mt-1 p-3 border rounded-lg pr-10 focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-orange-400"
              }`}
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-3 top-[45px] cursor-pointer text-gray-500"
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-orange-500 to-yellow-400 hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

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
                toast.error(error.message || "Google login failed");
              }
            } catch (err) {
              toast.error(err?.message || "Google login failed");
            } finally {
              setGoogleLoading(false);
            }
          }}
          className="w-full border py-3 rounded-lg hover:bg-gray-50 transition disabled:opacity-60"
        >
          {googleLoading ? "Redirecting…" : "Continue with Google"}
        </button>

        <p className="text-center mt-6 text-sm text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-orange-500 cursor-pointer font-medium"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}