"use client";

import Link from "next/link";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaFacebookF />, href: "https://facebook.com", color: "hover:bg-blue-600" },
    { icon: <FaGithub />, href: "https://github.com", color: "hover:bg-gray-900" },
    { icon: <FaLinkedinIn />, href: "https://linkedin.com", color: "hover:bg-blue-700" },
  ];

  return (
    <footer className="relative bg-[#fafaf9] border-t border-orange-100 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[30%] h-[50%] bg-orange-300 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-black tracking-tight">
                Mango <span className="text-orange-500">Library</span>
              </h2>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              A premium digital sanctuary for book lovers. Discover, borrow, and immerse yourself in a world of endless knowledge.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm border border-gray-100 text-gray-600 transition-all duration-300 hover:text-white hover:-translate-y-1 ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[#2d1f15] font-bold text-lg mb-6 relative inline-block">
              Quick Explore
              <span className="absolute bottom-[-8px] left-0 w-8 h-1 bg-orange-500 rounded-full" />
            </h3>
            <ul className="space-y-4">
              {["Home", "All Books", "Profile", "My Borrowed", "About Us"].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-500 text-sm hover:text-orange-500 hover:pl-2 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-200 group-hover:bg-orange-500 transition-colors" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#2d1f15] font-bold text-lg mb-6 relative inline-block">
              Get in Touch
              <span className="absolute bottom-[-8px] left-0 w-8 h-1 bg-orange-500 rounded-full" />
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                  <FaEnvelope size={14} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Email Us</p>
                  <p className="text-sm text-gray-600 font-medium">support@mangolibrary.com</p>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                  <FaPhoneAlt size={14} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Call Support</p>
                  <p className="text-sm text-gray-600 font-medium">+880 1810315536</p>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                  <FaMapMarkerAlt size={14} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Our Office</p>
                  <p className="text-sm text-gray-600 font-medium">Noakhali, Bangladesh</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-[#2d1f15] p-8 rounded-[2rem] text-white relative overflow-hidden group">
            <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-orange-500/20 blur-3xl rounded-full transition-transform group-hover:scale-150 duration-700" />
            <h3 className="text-xl font-bold mb-4 relative z-10">Join Our Newsletter</h3>
            <p className="text-gray-400 text-xs mb-6 relative z-10">Get updates on new arrivals and exclusive library events.</p>
            <div className="relative z-10">
              <input 
                type="email" 
                placeholder="Your email..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors mb-3"
              />
              <button className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-lg shadow-orange-500/20">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          <p>© {currentYear} <span className="font-bold text-[#2d1f15]">Mango Library</span>. Built with ❤️ in NoKhali.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-orange-500 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}