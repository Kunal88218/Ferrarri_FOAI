"use client";

import { useScroll, motion } from "framer-motion";
import { useRef } from "react";
import LaFerrariScrollCanvas from "@/components/LaFerrariScrollCanvas";
import LaFerrariExperience from "@/components/LaFerrariExperience";
import Navbar from "@/components/Navbar";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="bg-laferrari-black min-h-screen text-white selection:bg-racing-red selection:text-white">
      <Navbar />

      {/* SCROLL SECTION */}
      <section ref={containerRef} className="relative h-[500vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <LaFerrariScrollCanvas scrollYProgress={scrollYProgress} />
          <LaFerrariExperience scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <div className="relative z-20 bg-laferrari-black">
        <SpecsGrid />
        <Features />
        <Footer />
      </div>
    </main>
  );
}

function SpecsGrid() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h3 className="text-4xl font-orbitron font-bold mb-12 text-center uppercase">
        Technical Specifications
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[
          { label: "ICE Power", value: "800 CV" },
          { label: "Electric Power", value: "120 kW" },
          { label: "Combined Torque", value: ">900 Nm" },
          { label: "Max Revs", value: "9,250 rpm" },
          { label: "Compression Ratio", value: "13.5:1" },
          { label: "CO2 Emissions", value: "330 g/km" },
        ].map((item, i) => (
          <div
            key={i}
            className="p-8 border border-white/10 hover:border-laferrari-red/50 transition-colors duration-300"
          >
            <div className="text-sm font-rajdhani text-gray-400 uppercase mb-2">
              {item.label}
            </div>
            <div className="text-3xl font-orbitron font-bold text-white">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h3 className="text-4xl font-orbitron font-bold mb-6 uppercase">
            Hypercar Tech
          </h3>
          <p className="font-rajdhani text-lg leading-relaxed text-gray-300 mb-6">
            The HY-KERS system is more than just an engine; it's a statement of
            intent. Seamlessly integrating the V12's 800 CV with a 120 kW
            electric motor, it delivers instant torque and relentless
            acceleration.
          </p>
          <button className="px-8 py-3 bg-laferrari-red text-white font-orbitron font-bold tracking-wider hover:bg-red-700 transition-colors">
            Discover Tech
          </button>
        </div>
        <div className="h-64 md:h-96 bg-gray-900 border border-white/10 flex items-center justify-center">
          <span className="font-rajdhani text-gray-600">Feature Visual Placeholder</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-white/10 bg-black text-center">
      <div className="mb-4">
        <span className="font-orbitron font-bold text-2xl tracking-wider uppercase">
          Ferrari
        </span>
      </div>
      <p className="font-rajdhani text-gray-500 text-sm">
        © 2024 Ferrari S.p.A. All rights reserved.
      </p>
    </footer>
  );
}
