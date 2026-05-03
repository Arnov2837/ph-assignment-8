"use client";

import { motion } from "framer-motion";
import { BookOpen, Zap, ShieldCheck, Star, Users, Globe } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-orange-500" />,
      title: "Huge Collection",
      desc: "Explore thousands of books across Science, Tech, and Fiction.",
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      title: "Instant Borrowing",
      desc: "Get your favorite titles instantly with our seamless one-click system.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-orange-500" />,
      title: "Secure Access",
      desc: "Advanced authentication ensuring your personal data stays protected.",
    },
    {
      icon: <Star className="w-8 h-8 text-orange-500" />,
      title: "Premium Content",
      desc: "Access exclusive bestsellers and rare academic resources anytime.",
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "Community Driven",
      desc: "Join thousands of readers and share your reviews and thoughts.",
    },
    {
      icon: <Globe className="w-8 h-8 text-orange-500" />,
      title: "Read Anywhere",
      desc: "Our platform is optimized for all devices, from mobile to desktop.",
    },
  ];

  return (
    <section className="relative bg-[#fafaf9] py-24 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-200 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-100 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-orange-600 font-bold tracking-widest uppercase text-sm"
          >
            Features
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-extrabold text-[#2d1f15] mt-3"
          >
            Why Choose <span className="text-orange-500">Mango Library</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1.5 w-24 bg-orange-500 mx-auto mt-6 rounded-full origin-center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                {feature.icon}
              </div>
              
              <div className="bg-orange-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors duration-300">
                <div className="group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#2d1f15] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {feature.desc}
              </p>

              <div className="mt-6 flex items-center text-orange-600 font-semibold text-sm cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more 
                <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}