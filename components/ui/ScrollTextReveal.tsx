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
  
  // Set up the scroll trigger using a ref to track visibility
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
  
  // Animation config
  const { initial, animate } = getAnimationProps();
  const animConfig = {
    initial: isMounted ? initial : undefined,
    animate: isMounted && isVisible ? animate : initial,
    transition: {
      duration,
      delay,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  };

  // Create a wrapper div for the scroll trigger
  // This prevents invalid nesting issues
  const scrollTriggerWrapper = (content: React.ReactNode) => (
    <div ref={containerRef} className="contents" style={{ display: 'contents' }}>
      {content}
    </div>
  );

  // Handle each tag type separately to avoid invalid nesting
  switch (tag) {
    case 'p':
      return scrollTriggerWrapper(
        isMounted ? (
          <motion.p className={className} {...animConfig}>
            {children}
          </motion.p>
        ) : (
          <p className={className}>{children}</p>
        )
      );
    
    case 'h1':
      return scrollTriggerWrapper(
        isMounted ? (
          <motion.h1 className={className} {...animConfig}>
            {children}
          </motion.h1>
        ) : (
          <h1 className={className}>{children}</h1>
        )
      );
    
    case 'h2':
      return scrollTriggerWrapper(
        isMounted ? (
          <motion.h2 className={className} {...animConfig}>
            {children}
          </motion.h2>
        ) : (
          <h2 className={className}>{children}</h2>
        )
      );
    
    case 'h3':
      return scrollTriggerWrapper(
        isMounted ? (
          <motion.h3 className={className} {...animConfig}>
            {children}
          </motion.h3>
        ) : (
          <h3 className={className}>{children}</h3>
        )
      );
    
    case 'h4':
      return scrollTriggerWrapper(
        isMounted ? (
          <motion.h4 className={className} {...animConfig}>
            {children}
          </motion.h4>
        ) : (
          <h4 className={className}>{children}</h4>
        )
      );
    
    case 'h5':
      return scrollTriggerWrapper(
        isMounted ? (
          <motion.h5 className={className} {...animConfig}>
            {children}
          </motion.h5>
        ) : (
          <h5 className={className}>{children}</h5>
        )
      );
    
    case 'h6':
      return scrollTriggerWrapper(
        isMounted ? (
          <motion.h6 className={className} {...animConfig}>
            {children}
          </motion.h6>
        ) : (
          <h6 className={className}>{children}</h6>
        )
      );
    
    case 'span':
      return scrollTriggerWrapper(
        isMounted ? (
          <motion.span className={className} {...animConfig}>
            {children}
          </motion.span>
        ) : (
          <span className={className}>{children}</span>
        )
      );
    
    // Default case (div)
    default:
      return scrollTriggerWrapper(
        isMounted ? (
          <motion.div className={className} {...animConfig}>
            {children}
          </motion.div>
        ) : (
          <div className={className}>{children}</div>
        )
      );
  }
} 