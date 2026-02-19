"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { carData } from "../data/carData";

interface LaFerrariExperienceProps {
    scrollYProgress: MotionValue<number>;
}

export default function LaFerrariExperience({
    scrollYProgress,
}: LaFerrariExperienceProps) {
    // Section 1: Hero (0% - 33%)
    const yHero = useTransform(scrollYProgress, [0, 0.2, 0.33], [0, 0, -100]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.2, 0.33], [1, 1, 0]);

    // Section 2: Design (33% - 66%)
    const yDesign = useTransform(
        scrollYProgress,
        [0.3, 0.33, 0.5, 0.66],
        [100, 0, 0, -100]
    );
    const opacityDesign = useTransform(
        scrollYProgress,
        [0.3, 0.33, 0.5, 0.66],
        [0, 1, 1, 0]
    );

    // Section 3: Engine (66% - 100%)
    const yEngine = useTransform(
        scrollYProgress,
        [0.6, 0.66, 1],
        [100, 0, 0]
    );
    const opacityEngine = useTransform(
        scrollYProgress,
        [0.6, 0.66, 1],
        [0, 1, 1]
    );

    return (
        <div className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-between p-12 mix-blend-difference text-white">
            {/* GLOBAL HUD ELEMENTS */}
            <div className="absolute top-6 left-6 text-xs font-rajdhani opacity-50">
                SYS.STATUS: ONLINE // SCROLL.SEQ_ACTIVE
            </div>

            {/* HERO SECTION */}
            <motion.div
                style={{ y: yHero, opacity: opacityHero }}
                className="absolute top-1/3 left-12 max-w-xl"
            >
                <h1 className="text-8xl font-orbitron font-bold uppercase tracking-tighter loading-tight mb-4">
                    {carData.header.title}
                </h1>
                <p className="text-2xl font-rajdhani font-light mb-6 text-laferrari-red">
                    {carData.header.subtitle}
                </p>
                <div className="text-4xl font-orbitron">{carData.header.price}</div>
            </motion.div>

            {/* DESIGN SECTION */}
            <motion.div
                style={{ y: yDesign, opacity: opacityDesign }}
                className="absolute top-1/2 -translate-y-1/2 right-12 max-w-lg text-right"
            >
                <h2 className="text-6xl font-orbitron font-bold uppercase mb-6 border-b border-laferrari-red/50 pb-4 inline-block">
                    {carData.design.title}
                </h2>
                <p className="text-xl font-rajdhani leading-relaxed">
                    {carData.design.description}
                </p>
            </motion.div>

            {/* ENGINE SECTION */}
            <motion.div
                style={{ y: yEngine, opacity: opacityEngine }}
                className="absolute bottom-24 right-12 text-right"
            >
                <h2 className="text-6xl font-orbitron font-bold uppercase mb-8 text-laferrari-red">
                    {carData.engine.title}
                </h2>
                <div className="grid grid-cols-1 gap-4">
                    {carData.engine.specs.map((spec, index) => (
                        <div
                            key={index}
                            className="flex justify-end items-center gap-4 border-b border-white/20 pb-2"
                        >
                            <span className="text-sm font-rajdhani uppercase opacity-70">
                                {spec.label}
                            </span>
                            <span className="text-3xl font-orbitron">{spec.value}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
