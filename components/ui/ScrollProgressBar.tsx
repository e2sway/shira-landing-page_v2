'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type ProgressPosition = 'top' | 'bottom' | 'left' | 'right';

interface ScrollProgressBarProps {
  position?: ProgressPosition;
  height?: number;
  color?: string;
  zIndex?: number;
  containerClassName?: string;
  progressClassName?: string;
}

export function ScrollProgressBar({
  position = 'top',
  height = 4,
  color = '#8A80F9',
  zIndex = 50,
  containerClassName,
  progressClassName
}: ScrollProgressBarProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Effect for client-side only mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    if (!isMounted || !progressRef.current || !containerRef.current || typeof window === 'undefined') {
      return;
    }
    
    // Create a GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      // Determine whether we're animating width or height
      const isVertical = position === 'left' || position === 'right';
      const prop = isVertical ? 'height' : 'width';
      
      // Create the ScrollTrigger animation
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
        onUpdate: (self) => {
          if (progressRef.current) {
            gsap.set(progressRef.current, {
              [prop]: `${self.progress * 100}%`
            });
          }
        }
      });
    });
    
    return () => ctx.revert();
  }, [isMounted, position]);
  
  // Determine styles based on position
  const getPositionStyles = () => {
    const isVertical = position === 'left' || position === 'right';
    
    const baseStyles = {
      top: position === 'top' ? 0 : 'auto',
      bottom: position === 'bottom' ? 0 : 'auto',
      left: position === 'left' ? 0 : position === 'right' ? 'auto' : 0,
      right: position === 'right' ? 0 : 'auto',
      width: isVertical ? `${height}px` : '100%',
      height: isVertical ? '100vh' : `${height}px`
    };
    
    return baseStyles;
  };
  
  // Determine styles for the progress indicator
  const getProgressStyles = () => {
    const isVertical = position === 'left' || position === 'right';
    
    const transformOrigin = {
      top: 'left center',
      bottom: 'left center',
      left: 'center bottom',
      right: 'center bottom'
    }[position];
    
    return {
      backgroundColor: color,
      width: isVertical ? '100%' : '0%',
      height: isVertical ? '0%' : '100%',
      transformOrigin
    };
  };
  
  // Only render on client side to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }
  
  return (
    <div
      ref={containerRef}
      className={cn(
        'fixed z-50 pointer-events-none',
        containerClassName
      )}
      style={{
        ...getPositionStyles(),
        zIndex
      }}
    >
      <div
        ref={progressRef}
        className={cn(
          'h-full w-full transition-all duration-150 ease-out',
          progressClassName
        )}
        style={getProgressStyles()}
      />
    </div>
  );
} 