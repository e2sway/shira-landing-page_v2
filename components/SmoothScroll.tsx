"use client";

import React, { ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Initialize Lenis with optimized settings for 2025
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
      autoRaf: true, // Let Lenis handle the RAF loop automatically
    });

    // Only needed if not using autoRaf: true
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    if (!lenis.options.autoRaf) {
      requestAnimationFrame(raf);
    }

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
} 