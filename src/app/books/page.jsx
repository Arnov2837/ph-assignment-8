"use client";

import books from "@/data/books.json";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, Eye } from "lucide-react";

export default function BooksPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(books.map((b) => b.category))];

  const filteredBooks = books.filter((book) => {
    const matchSearch = book.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || book.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <section className="min-h-screen bg-[#fafaf9] py-12 md:py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-[#2d1f15]"
          >
            All <span className="text-orange-500">Books</span>
          </motion.h1>
          <p className="text-gray-500 mt-3 text-sm">Find the perfect book for you</p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row items-center gap-4 mb-16 bg-white p-3 rounded-2xl shadow-sm border border-orange-50"
        >
          <div className="relative w-full lg:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
            <input
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-orange-400 outline-none text-sm transition-all"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  category === cat
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                    : "bg-white text-gray-500 hover:bg-orange-50 hover:text-orange-600 border border-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredBooks.map((book) => (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group bg-white rounded-[1.5rem] p-3 md:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300 border border-transparent hover:border-orange-100"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#f9f9f9]">
                  <img
                    src={book.image_url}
                    alt={book.title}
                    className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                  />
                  {book.rating >= 4.8 && (
                    <div className="absolute top-3 left-3 bg-[#006aff] text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                      Top Rated
                    </div>
                  )}
                </div>

                <div className="mt-5 space-y-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    {book.category}
                  </p>
                  
                  <h3 className="font-bold text-sm md:text-base text-[#001e3c] line-clamp-2 min-h-[40px] leading-tight">
                    {book.title}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="text-lg font-bold text-[#006aff]">
                      ★ {book.rating}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      (5.0)
                    </span>
                  </div>

                  <Link
                    href={`/books/${book.id}`}
                    className="w-full mt-4 py-3 rounded-xl bg-orange-500 text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#001428] transition-all shadow-md active:scale-95"
                  >
                    <Eye size={16} />
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}