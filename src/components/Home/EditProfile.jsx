"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { User, Image as ImageIcon, Camera, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function EditProfile({ user }) {
  const [name, setName] = useState(user.name || "");
  const [image, setImage] = useState(user.image || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, image }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Profile updated successfully");
        router.push("/profile");
        router.refresh();
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-50 relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-orange-500/10 to-yellow-400/10 -z-0" />

        <div className="relative z-10">
          <div className="flex flex-col items-center mb-10">
            <div className="relative group">
              <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-gray-100">
                {image ? (
                  <img 
                    src={image} 
                    alt="Preview" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    onError={(e) => e.target.src = "https://ui-avatars.com/api/?name=" + name}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <User size={40} />
                  </div>
                )}
              </div>
           
            </div>
            <h2 className="mt-4 text-xl font-bold text-[#2d1f15]">Edit Your Profile</h2>
            <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mt-1">Personal Settings</p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-wider ml-1">
                <User size={14} className="text-orange-500" /> Full Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-5 py-4 rounded-2xl border-none bg-gray-50 text-[#2d1f15] font-medium focus:ring-2 focus:ring-orange-400 outline-none transition-all placeholder:text-gray-300"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-wider ml-1">
                <ImageIcon size={14} className="text-orange-500" /> Profile Image URL
              </label>
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://image-link.com"
                className="w-full px-5 py-4 rounded-2xl border-none bg-gray-50 text-[#2d1f15] font-medium focus:ring-2 focus:ring-orange-400 outline-none transition-all placeholder:text-gray-300 text-sm"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl text-white font-bold bg-[#2d1f15] hover:bg-orange-500 shadow-lg shadow-gray-200 hover:shadow-orange-200 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 group cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </span>
                ) : (
                  <>
                    Save Changes <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <p className="text-center mt-6 text-gray-400 text-sm">
        Changes will be reflected across your account.
      </p>
    </motion.div>
  );
}