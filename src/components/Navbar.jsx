"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  FaBook,
  FaHome,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const ref = useRef();

  const avatar = user?.image || "/avatar.png";

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  const navLinks = [
    { name: "Home", href: "/", icon: <FaHome /> },
    { name: "Books", href: "/books", icon: <FaBook /> },
    { name: "Profile", href: "/profile", icon: <FaUser /> },
  ];

  return (
    <>
      <nav className="w-full border-b border-amber-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

          <Link href="/" className="text-xl font-bold flex items-center gap-2">
            <FaBook className="text-orange-500" />
            Mango Library
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-medium transition ${
                  pathname === link.href
                    ? "text-orange-500"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {link.name}
                {pathname === link.href && (
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-orange-500 rounded"></span>
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 relative" ref={ref}>
            {!user ? (
              <button
                onClick={() => router.push("/login")}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:opacity-90 transition"
              >
                Login
              </button>
            ) : (
              <>
                <img
                  src={avatar}
                  alt="user"
                  onClick={() => setOpen(!open)}
                  className="w-9 h-9 rounded-full object-cover border cursor-pointer border-amber-200"
                />

                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-white rounded-lg bg-amber-500 hover:bg-gray-200 transition flex items-center gap-1 text-sm"
                >
                  <FaSignOutAlt />
                </button>

                {open && (
                  <div className="absolute right-0 top-12 w-56 bg-white border rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={avatar}
                        alt="user"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white py-2 rounded-lg hover:opacity-90 transition"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-amber-200 flex justify-around items-center py-2 md:hidden z-50">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center text-xs ${
                isActive ? "text-orange-500" : "text-gray-500"
              }`}
            >
              {link.href === "/profile" && user ? (
                <img
                  src={avatar}
                  alt="user"
                  className={`w-7 h-7 rounded-full border-amber-200  object-cover border ${
                    isActive ? "border-orange-500" : ""
                  }`}
                />
              ) : (
                <div className="text-lg">{link.icon}</div>
              )}
              {link.name}
            </Link>
          );
        })}
      </div>
    </>
  );
}