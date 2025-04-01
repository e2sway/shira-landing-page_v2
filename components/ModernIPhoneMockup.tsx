'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ModernIPhoneMockupProps {
  children: React.ReactNode;
  color?: 'deep-purple' | 'gold' | 'space-black' | 'silver';
  className?: string;
  performanceMode?: boolean;
  slideFrom?: 'left' | 'right' | 'bottom' | 'top';
  parallaxStrength?: number;
  variant?: 'iPhone14' | 'iPhone15Pro';
  interactiveDynamicIsland?: boolean;
  hideNotch?: boolean;
}

export function ModernIPhoneMockup({
  children,
  color = 'deep-purple',
  className,
  performanceMode = false,
  slideFrom = 'bottom',
  parallaxStrength = 0.2,
  variant = 'iPhone15Pro',
  interactiveDynamicIsland = true,
  hideNotch = false
}: ModernIPhoneMockupProps) {
  const phoneRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Colors and design based on iPhone variants
  const colorMap = {
    'deep-purple': {
      hue: 284,
      borderglass: 'bg-[#7a70e0]/20',
      border: 'border-[#7a70e0]/20',
      shadow: 'shadow-[0_0_30px_rgba(138,128,249,0.3)]',
      highlight: 'bg-gradient-to-br from-[#8A80F9] to-[#5A51E1]',
      borderColor: '#7a70e0'
    },
    'gold': {
      hue: 22.5,
      borderglass: 'bg-[#E6C195]/20',
      border: 'border-[#E6C195]/20',
      shadow: 'shadow-[0_0_30px_rgba(230,193,149,0.3)]',
      highlight: 'bg-gradient-to-br from-[#FFD700] to-[#B8860B]',
      borderColor: '#E6C195'
    },
    'space-black': {
      hue: 215,
      borderglass: 'bg-[#2D3748]/20',
      border: 'border-[#2D3748]/20',
      shadow: 'shadow-[0_0_30px_rgba(45,55,72,0.5)]',
      highlight: 'bg-gradient-to-br from-[#4A5568] to-[#1A202C]',
      borderColor: '#2D3748'
    },
    'silver': {
      hue: 254,
      borderglass: 'bg-[#A0AEC0]/20',
      border: 'border-[#A0AEC0]/20',
      shadow: 'shadow-[0_0_30px_rgba(160,174,192,0.3)]',
      highlight: 'bg-gradient-to-br from-[#E2E8F0] to-[#A0AEC0]',
      borderColor: '#A0AEC0'
    }
  };

  // Phone variant properties
  const variantProps = {
    iPhone14: {
      borderRadius: 'rounded-[44px]',
      screenRadius: 'rounded-[38px]',
      notchWidth: 'w-[30%]',
      notchHeight: 'h-7',
      notchRadius: 'rounded-b-[16px]',
      aspectRatio: 'aspect-[9/19.5]',
      hasDynamicIsland: false
    },
    iPhone15Pro: {
      borderRadius: 'rounded-[50px]',
      screenRadius: 'rounded-[44px]',
      notchWidth: 'w-[28%]',
      notchHeight: 'h-6',
      notchRadius: 'rounded-[20px]',
      aspectRatio: 'aspect-[9/19.5]',
      hasDynamicIsland: true
    }
  };

  // Handle client-side only mounting to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Function to render the dynamic island or notch
  const renderNotchOrIsland = () => {
    if (hideNotch) {
      return null;
    }
    
    if (variantProps[variant].hasDynamicIsland) {
      return (
        <div className="absolute top-0 inset-x-0 flex justify-center z-[30] pt-[4px]">
          <div 
            className={cn(
              "overflow-hidden bg-black flex items-center justify-center",
              variantProps[variant].notchRadius,
              variantProps[variant].notchWidth,
              variantProps[variant].notchHeight
            )}
          >
            <div className="flex justify-center items-center space-x-3">
              <div className="w-[7px] h-[7px] rounded-full bg-gray-800/70"></div>
              <div className="w-[5px] h-[5px] rounded-full bg-gray-800/50"></div>
            </div>
          </div>
        </div>
      );
    } else {
      // Classic notch for older iPhone models
      return (
        <div className="absolute top-0 inset-x-0 flex justify-center z-[30]">
          <div className={cn(
            "bg-black flex items-center justify-center overflow-hidden",
            variantProps[variant].notchRadius,
            variantProps[variant].notchWidth,
            variantProps[variant].notchHeight
          )}>
            <div className="flex justify-center items-center space-x-3">
              <div className="w-[7px] h-[7px] rounded-full bg-gray-800/70"></div>
              <div className="w-[5px] h-[5px] rounded-full bg-gray-800/50"></div>
            </div>
          </div>
        </div>
      );
    }
  };
  
  // Parallax effect with scroll
  useEffect(() => {
    if (!isMounted || !phoneRef.current || performanceMode || typeof window === 'undefined') return;
    
    // Create a GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      // Apply parallax effect with scroll
      const parallaxStrengthMapped = parallaxStrength * 100;
      
      ScrollTrigger.create({
        trigger: phoneRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (!phoneRef.current) return;
          
          const progress = self.progress;
          const moveY = slideFrom === 'bottom' || slideFrom === 'top' 
            ? (parallaxStrengthMapped * (0.5 - progress)) 
            : 0;
          const moveX = slideFrom === 'left' || slideFrom === 'right' 
            ? (parallaxStrengthMapped * (0.5 - progress)) 
            : 0;
          
          gsap.set(phoneRef.current, {
            y: moveY,
            x: moveX,
            force3D: true,
          });
        }
      });
    });
    
    // Cleanup
    return () => ctx.revert();
  }, [isMounted, performanceMode, slideFrom, parallaxStrength]);
  
  // Initial slide-in animation
  useEffect(() => {
    if (!isMounted || !phoneRef.current || performanceMode || typeof window === 'undefined') return;

    // Create a GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      // Define animation based on slide direction
      let fromX = 0;
      let fromY = 0;
      
      if (slideFrom === 'left') fromX = -50;
      if (slideFrom === 'right') fromX = 50;
      if (slideFrom === 'top') fromY = -50;
      if (slideFrom === 'bottom') fromY = 50;
      
      gsap.fromTo(
        phoneRef.current,
        { 
          x: fromX, 
          y: fromY, 
          opacity: 0 
        },
        {
          duration: 1,
          x: 0,
          y: 0,
          opacity: 1,
          ease: 'power3.out',
        }
      );
    });
    
    return () => ctx.revert();
  }, [isMounted, performanceMode, slideFrom]);

  return (
    <div
      ref={phoneRef}
      className={cn(
        "relative transform-gpu will-change-transform",
        "phone-mockup",
        className
      )}
      style={{ 
        opacity: isMounted ? 1 : 1,
        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out'
      }}
    >
      {/* iPhone Frame */}
      <div 
        className={cn(
          "relative bg-black",
          variantProps[variant].borderRadius,
          variantProps[variant].aspectRatio
        )}
        style={{
          boxShadow: `0 8px 40px rgba(0, 0, 0, 0.12)`,
        }}
      >
        {/* Side buttons */}
        <div className="absolute -left-[2px] top-[20%] h-[20%] w-[0.35rem]">
          {/* Silent switch */}
          <div className="absolute left-0 top-[0] h-6 w-[3px] bg-gray-800 -translate-x-[1px] rounded-r-md"></div>
          
          {/* Volume buttons */}
          <div className="absolute left-0 top-[35px] h-10 w-[3px] bg-gray-800 -translate-x-[1px] rounded-r-md"></div>
          <div className="absolute left-0 top-[65px] h-10 w-[3px] bg-gray-800 -translate-x-[1px] rounded-r-md"></div>
        </div>
        
        {/* Power button */}
        <div className="absolute -right-[2px] top-[25%] h-16 w-[3px] bg-gray-800 translate-x-[1px] rounded-l-md"></div>
        
        {/* Screen Container */}
        <div 
          ref={screenRef}
          className={cn(
            "absolute inset-[5px] overflow-hidden",
            variantProps[variant].screenRadius
          )}
        >
          {/* Background blur effect */}
          <div className={cn(
            "absolute inset-0 z-0",
            colorMap[color].borderglass
          )} />
          
          {/* Content Area */}
          <div className="absolute inset-0 overflow-hidden">
            {children}
          </div>
          
          {/* Bottom indicator bar */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[35%] h-1 bg-white rounded-full opacity-80"></div>
          
          {/* Render notch or dynamic island - directly without a wrapper */}
          {renderNotchOrIsland()}
        </div>
      </div>
    </div>
  );
} 