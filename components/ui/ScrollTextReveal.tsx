'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

// Only register the plugin on the client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollTextRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  duration?: number;
  markers?: boolean;
  threshold?: string;
  tag?: 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}

export function ScrollTextReveal({
  children,
  className = '',
  stagger = 0.1,
  duration = 0.6,
  markers = false,
  threshold = '0% 20%',
  tag = 'div',
  direction = 'up',
  delay = 0
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Mount state for client-side only features
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Calculate initial and animate properties based on direction
  const getAnimationProps = () => {
    const distance = 30; // pixels to animate
    
    switch (direction) {
      case 'up':
        return {
          initial: { y: distance, opacity: 0 },
          animate: { y: 0, opacity: 1 }
        };
      case 'down':
        return {
          initial: { y: -distance, opacity: 0 },
          animate: { y: 0, opacity: 1 }
        };
      case 'left':
        return {
          initial: { x: distance, opacity: 0 },
          animate: { x: 0, opacity: 1 }
        };
      case 'right':
        return {
          initial: { x: -distance, opacity: 0 },
          animate: { x: 0, opacity: 1 }
        };
      default:
        return {
          initial: { y: distance, opacity: 0 },
          animate: { y: 0, opacity: 1 }
        };
    }
  };
  
  // Set up the scroll trigger
  useEffect(() => {
    if (!isMounted || !containerRef.current) return;
    
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: threshold,
      onEnter: () => {
        setIsVisible(true);
      },
      markers: markers
    });
    
    return () => {
      trigger.kill();
    };
  }, [isMounted, markers, threshold]);
  
  // To prevent hydration errors, we need to be consistent in our rendering
  // We'll use the same component structure whether on server or client
  const Tag = tag;
  const { initial, animate } = getAnimationProps();
  
  // Server-side safe animation props
  const animationProps = {
    initial: isMounted ? initial : false, // Don't apply initial animation on server
    animate: isMounted ? (isVisible ? animate : initial) : false, // Don't animate on server
    transition: {
      duration: duration,
      delay: delay,
      ease: [0.25, 0.1, 0.25, 1.0], // cubic-bezier easing
    }
  };
  
  return (
    <Tag ref={containerRef} className={className}>
      {isMounted ? (
        <motion.div {...animationProps} className="w-full">
          {children}
        </motion.div>
      ) : (
        // On server, render without animation wrapper
        <div className="w-full">
          {children}
        </div>
      )}
    </Tag>
  );
} 