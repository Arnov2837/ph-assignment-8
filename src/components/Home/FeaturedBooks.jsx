"use client";

import books from "@/data/books.json";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Eye, ArrowRight } from "lucide-react";

export default function FeaturedBooks() {
  const featured = books.slice(0, 4);

  return (
    <section className="bg-[#fafaf9] py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/50 blur-[100px] rounded-full -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50/50 blur-[100px] rounded-full -ml-32 -mb-32" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-orange-500 font-bold tracking-widest uppercase text-xs"
            >
              Top Picks
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-[#001e3c] mt-2"
            >
              Featured <span className="text-orange-500">Books</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link 
              href="/books" 
              className="group flex items-center gap-2 text-[#001e3c] font-bold hover:text-orange-500 transition-colors"
            >
              Explore All Library <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {featured.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-[2rem] p-3 md:p-4 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-transparent hover:border-orange-100 transition-all duration-500"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#fdfdfd]">
                <img
                  src={book.image_url}
                  alt={book.title}
                  className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
                  <Star size={12} className="fill-orange-500 text-orange-500" />
                  <span className="text-[10px] md:text-xs font-black text-[#001e3c]">{book.rating}</span>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black uppercase tracking-wider text-orange-500 bg-orange-50 px-2 py-0.5 rounded-md">
                    {book.category}
                  </span>
                </div>
                
                <h3 className="font-bold text-sm md:text-base text-[#001e3c] line-clamp-1 group-hover:text-orange-500 transition-colors">
                  {book.title}
                </h3>
                
                <p className="text-gray-400 text-[11px] md:text-xs mt-1 mb-4 line-clamp-1">
                  {book.author}
                </p>

                <Link
                  href={`/books/${book.id}`}
                  className="w-full mt-4 py-3 rounded-xl bg-orange-500  text-white text-[11px] md:text-xs font-bold flex items-center justify-center gap-2 hover:bg-orange-500 transition-all shadow-md active:scale-95 group/btn"
                >
                  <Eye size={16} className="group-hover/btn:scale-110 transition-transform" />
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}