"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6"
        >
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-laferrari-red rounded-sm" />
                <span className="font-orbitron font-bold text-xl tracking-wider uppercase">
                    Ferrari
                </span>
            </div>

            {/* CTA Button */}
            <Link
                href="#inquire"
                className="glass-panel px-6 py-2 rounded-full font-rajdhani font-semibold tracking-wide uppercase hover:bg-laferrari-red/80 transition-colors duration-300"
            >
                Inquire Now
            </Link>
        </motion.nav>
    );
}
