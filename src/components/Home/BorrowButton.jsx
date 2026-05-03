"use client";

import toast from "react-hot-toast";

export default function BorrowButton() {
  return (
    <button
      onClick={() => toast.success("Book borrowed successfully")}
      className="mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold hover:opacity-90 transition cursor-pointer w-full"
    >
      Borrow This Book
    </button>
  );
}