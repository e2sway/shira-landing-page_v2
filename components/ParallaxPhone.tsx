'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxPhoneProps {
  children: React.ReactNode;
  color?: 'purple' | 'blue' | 'black';
  className?: string;
  performanceMode?: boolean;
  slideFrom?: 'left' | 'right' | 'bottom' | 'top';
  parallaxStrength?: number;
  variant?: 'iPhone14' | 'iPhone15Pro' | 'iPhone15';
}

export function ParallaxPhone({
  children,
  color = 'purple',
  className,
  performanceMode = false,
  slideFrom = 'bottom',
  parallaxStrength = 0.2,
  variant = 'iPhone15Pro'
}: ParallaxPhoneProps) {
  const phoneRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Map color to shadow and border classes
  const colorMap = {
    purple: {
      shadow: 'shadow-[0_0_30px_rgba(138,128,249,0.3)]',
      border: 'border-[#8A80F9]/20',
      highlight: 'bg-gradient-to-br from-[#8A80F9] to-[#5A51E1]',
      borderColor: '#7a70e0'
    },
    blue: {
      shadow: 'shadow-[0_0_30px_rgba(59,130,246,0.3)]',
      border: 'border-blue-500/20',
      highlight: 'bg-gradient-to-br from-blue-400 to-blue-600',
      borderColor: '#3b82f6'
    },
    black: {
      shadow: 'shadow-[0_0_30px_rgba(0,0,0,0.7)]',
      border: 'border-gray-700',
      highlight: 'bg-gradient-to-br from-gray-700 to-gray-900',
      borderColor: '#374151'
    }
  };

  // iPhone variant properties
  const variantProps = {
    iPhone14: {
      borderRadius: 'rounded-[44px]',
      notchWidth: 'w-[30%]',
      notchHeight: 'h-7',
      aspectRatio: 'aspect-[9/19.5]',
    },
    iPhone15: {
      borderRadius: 'rounded-[44px]',
      notchWidth: 'w-[25%]',
      notchHeight: 'h-9',
      aspectRatio: 'aspect-[9/19.5]',
    },
    iPhone15Pro: {
      borderRadius: 'rounded-[50px]',
      notchWidth: 'w-[25%]',
      notchHeight: 'h-9',
      aspectRatio: 'aspect-[9/19.5]',
    }
  };

  // Handle client-side only mounting to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
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
  
  // Base styling that works for both SSR and CSR
  const phoneStyles = cn(
    'relative w-full transform-gpu',
    'phone-mockup', // Add a custom class for targeting
    className
  );
  
  const contentStyles = cn(
    'relative overflow-hidden',
    variantProps[variant].borderRadius,
    'backdrop-blur-sm bg-black',
    'transform-gpu',
    'border-[14px] border-solid',
    'shadow-lg'
  );
  
  const innerStyles = cn(
    'h-full w-full overflow-hidden relative',
    variantProps[variant].aspectRatio, // Use variant-specific aspect ratio
    variantProps[variant].borderRadius
  );
  
  // Generate dynamic island or notch based on iPhone variant
  const renderNotch = () => {
    if (variant === 'iPhone15Pro' || variant === 'iPhone15') {
      // Dynamic Island for iPhone 15 models
      return (
        <div className="absolute top-0 inset-x-0 flex justify-center z-10 pt-2">
          <div className={cn(
            'bg-black rounded-full flex items-center justify-center overflow-hidden',
            variantProps[variant].notchWidth,
            variantProps[variant].notchHeight
          )}>
            <div className="absolute inset-0 flex justify-center items-center space-x-3">
              <div className="w-2 h-2 rounded-full bg-gray-800/70"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-800/50"></div>
            </div>
          </div>
        </div>
      );
    } else {
      // Classic notch for older iPhone models
      return (
        <div className="absolute top-0 inset-x-0 flex justify-center z-10">
          <div className={cn(
            'bg-black rounded-b-[16px] flex items-center justify-center overflow-hidden',
            variantProps[variant].notchWidth,
            variantProps[variant].notchHeight
          )}>
            <div className="w-1/3 h-4 bg-black border border-gray-800 rounded-full"></div>
          </div>
        </div>
      );
    }
  };
  
  return (
    <div
      ref={phoneRef}
      className={phoneStyles}
      style={{ 
        // Add default opacity for SSR to ensure visibility
        opacity: isMounted ? 1 : 1,
        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out'
      }}
    >
      <div 
        className={contentStyles}
        style={{ 
          borderColor: colorMap[color].borderColor,
          boxShadow: `0 0 30px ${colorMap[color].borderColor}40`
        }}
      >
        {/* Render notch or dynamic island */}
        {renderNotch()}
        
        {/* Side buttons */}
        <div className="absolute">
          {/* Power button */}
          <div className="absolute right-0 top-32 w-[3px] h-16 bg-gray-800 -translate-x-[-5px] rounded-l-lg"></div>
          
          {/* Volume buttons */}
          <div className="absolute left-0 top-24 w-[3px] h-10 bg-gray-800 translate-x-[-5px] rounded-r-lg"></div>
          <div className="absolute left-0 top-40 w-[3px] h-14 bg-gray-800 translate-x-[-5px] rounded-r-lg"></div>
          
          {/* Silent mode switch */}
          <div className="absolute left-0 top-[84px] w-[4px] h-6 bg-gray-800 translate-x-[-5px] rounded-r-lg"></div>
        </div>
        
        {/* Phone Content - maintains aspect ratio for 1290x2796 screenshots */}
        <div ref={innerRef} className={innerStyles}>
          {children}
        </div>
      </div>
    </div>
  );
} 