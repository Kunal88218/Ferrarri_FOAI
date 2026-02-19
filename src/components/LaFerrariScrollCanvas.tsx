"use client";

import { useMotionValueEvent, useScroll, MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface LaFerrariScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
    totalFrames?: number;
    imageFolderPath?: string;
}

export default function LaFerrariScrollCanvas({
    scrollYProgress,
    totalFrames = 240,
    imageFolderPath = "/images/La_Ferrari_Frames-sequence",
}: LaFerrariScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load images on mount
    useEffect(() => {
        let loadedCount = 0;
        const imgArray: HTMLImageElement[] = [];

        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            // Match the pattern: ezgif-frame-001.jpg
            const filename = `ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
            img.src = `${imageFolderPath}/${filename}`;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalFrames) {
                    setIsLoaded(true);
                }
            };
            imgArray.push(img);
        }
        setImages(imgArray);
    }, [totalFrames, imageFolderPath]);

    // Draw frame based on scroll progress
    const renderFrame = (progress: number) => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Map progress (0-1) to frame index
        const frameIndex = Math.min(
            totalFrames - 1,
            Math.floor(progress * totalFrames)
        );

        // Safety check defined images
        const img = images[frameIndex];
        if (!img) return;

        // Handle high DPI
        const dpr = window.devicePixelRatio || 1;

        // ensure canvas size matches window size
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;

        ctx.scale(dpr, dpr);

        // Clear
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        // Object-fit: contain logic
        const hRatio = window.innerWidth / img.width;
        const vRatio = window.innerHeight / img.height;
        const ratio = Math.min(hRatio, vRatio); // contain

        const centerShift_x = (window.innerWidth - img.width * ratio) / 2;
        const centerShift_y = (window.innerHeight - img.height * ratio) / 2;

        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    };

    // Listen to scroll changes
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (isLoaded) {
            requestAnimationFrame(() => renderFrame(latest));
        }
    });

    // Initial render when loaded
    useEffect(() => {
        if (isLoaded) {
            renderFrame(scrollYProgress.get());
        }
    }, [isLoaded, scrollYProgress]);

    // Resize handler
    useEffect(() => {
        const handleResize = () => {
            if (isLoaded) renderFrame(scrollYProgress.get());
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded, scrollYProgress]);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 w-full h-full object-contain transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"
                }`}
            style={{ zIndex: 0 }}
        />
    );
}
