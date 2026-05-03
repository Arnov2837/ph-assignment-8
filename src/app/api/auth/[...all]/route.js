import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Better Auth এর handler কে Next.js এর উপযোগী করে এক্সপোর্ট করা
export const { GET, POST } = toNextJsHandler(auth);