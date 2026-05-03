import CTA from "@/components/Home/CTA";
import FeaturedBooks from "@/components/Home/FeaturedBooks";
import Hero from "@/components/Home/Hero";
import Marquee from "@/components/Home/Marquee";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      
      <Hero/>
      <FeaturedBooks/>
      <Marquee/>
      <WhyChooseUs/>
      <CTA/>
    </div>
  );
}
