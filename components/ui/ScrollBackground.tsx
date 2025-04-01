'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DynamicBackground } from './DynamicBackground';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollBackgroundProps {
  colorStart?: string;
  colorEnd?: string;
  particleCount?: number;
  enableMeteors?: boolean;
  enableOrbs?: boolean;
  performanceMode?: boolean;
}

export function ScrollBackground({
  colorStart = '#8A80F9',
  colorEnd = '#5A51E1',
  particleCount = 30,
  enableMeteors = true,
  enableOrbs = true,
  performanceMode = false
}: ScrollBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Effect for client-side only mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Function to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : { r: 0, g: 0, b: 0 };
  };
  
  // Create RGB arrays for color interpolation
  const startRGB = hexToRgb(colorStart);
  const endRGB = hexToRgb(colorEnd);
  
  useEffect(() => {
    if (!isMounted || !containerRef.current || typeof window === 'undefined' || performanceMode) return;
    
    // Create a GSAP context to ensure cleanup
    const ctx = gsap.context(() => {
      // Set up scroll-triggered animation for background color
      gsap.to(containerRef.current!, {
        backgroundColor: `rgba(${endRGB.r}, ${endRGB.g}, ${endRGB.b}, 0.1)`,
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        }
      });
      
      // Set up scroll-triggered animation for particles
      const particles = containerRef.current!.querySelectorAll('.particle');
      particles.forEach((particle, i) => {
        const staggerDelay = i * 0.02;
        
        gsap.to(particle, {
          scale: gsap.utils.random(0.7, 1.3),
          opacity: gsap.utils.random(0.1, 0.4),
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          }
        });
      });
    });
    
    // Clean up
    return () => ctx.revert();
  }, [isMounted, endRGB, performanceMode]);
  
  // Only render on client side to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[-1] transition-colors duration-500"
      style={{ backgroundColor: `rgba(${startRGB.r}, ${startRGB.g}, ${startRGB.b}, 0.1)` }}
    >
      <DynamicBackground 
        particleCount={particleCount}
        enableMeteors={enableMeteors}
        enableOrbs={enableOrbs}
        primaryColor={colorStart}
        secondaryColor={colorEnd}
        accentColor={colorStart} // Using start color as accent
        performanceMode={performanceMode}
        gridSize={40}
      />
    </div>
  );
} 