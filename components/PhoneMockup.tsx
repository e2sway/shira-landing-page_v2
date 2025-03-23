'use client'
import React from 'react'
import { motion } from 'framer-motion'

interface PhoneMockupProps {
  children: React.ReactNode
  slideFrom?: 'left' | 'right'
  color?: 'black' | 'white' | 'purple'
  performanceMode?: boolean
}

export function PhoneMockup({ 
  children, 
  slideFrom = 'right',
  color = 'black',
  performanceMode = true
}: PhoneMockupProps) {
  // Define color schemes
  const colorSchemes = {
    black: {
      frame: 'bg-[#181818]',
      shadow: 'shadow-[0_0_30px_rgba(0,0,0,0.4)]',
      buttons: 'bg-[#282828]',
      accent: 'bg-[#333]'
    },
    white: {
      frame: 'bg-[#f5f5f7]',
      shadow: 'shadow-[0_0_30px_rgba(0,0,0,0.2)]',
      buttons: 'bg-[#e0e0e0]',
      accent: 'bg-[#ddd]'
    },
    purple: {
      frame: 'bg-[#1a1825]',
      shadow: 'shadow-[0_0_30px_rgba(138,128,249,0.3)]',
      buttons: 'bg-[#282838]',
      accent: 'bg-[#8A80F9]'
    }
  }
  
  // Animation variants with performance optimizations
  const phoneVariants = {
    hidden: {
      x: slideFrom === 'left' ? -100 : 100,
      opacity: 0,
      rotateY: slideFrom === 'left' ? -15 : 15
    },
    visible: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: 'spring',
        damping: 20, // Increased damping for performance
        stiffness: 90, // Reduced stiffness
        duration: 0.7 // Fixed duration
      }
    }
  }

  // Simpler hover animations for performance mode
  const hoverAnimation = performanceMode ? {
    scale: 1.01,
    y: -5,
    transition: { duration: 0.3 }
  } : {
    scale: 1.03,
    y: -10,
    rotateY: slideFrom === 'left' ? -2 : 2,
    transition: { 
      duration: 0.5, 
      ease: [0.33, 1, 0.68, 1] 
    }
  }

  return (
    <motion.div
      className="w-full max-w-[300px] perspective-1500"
      style={{ willChange: 'transform' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={phoneVariants}
      whileHover={hoverAnimation}
    >
      {/* Hovering shadow effect - simplified in performance mode */}
      {!performanceMode && (
        <motion.div 
          className="absolute -inset-10 opacity-30 z-[-1]"
          style={{ 
            background: `radial-gradient(50% 50% at 50% 50%, ${color === 'purple' ? 'rgba(138, 128, 249, 0.25)' : 'rgba(30, 30, 30, 0.25)'} 0%, transparent 100%)`,
            willChange: 'opacity, transform'
          }}
          animate={{
            opacity: [0.2, 0.3, 0.2],
            scale: [0.95, 1.05, 0.95]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )}
      
      {/* Phone frame */}
      <div 
        className={`relative rounded-[40px] ${colorSchemes[color].frame} ${colorSchemes[color].shadow} overflow-hidden aspect-[9/19] p-[4%]`}
        style={{ 
          willChange: 'transform',
          backgroundImage: !performanceMode && color === 'purple' ? 
            'linear-gradient(135deg, rgba(138, 128, 249, 0.1) 0%, rgba(20, 20, 30, 0) 80%)' : 
            'none'
        }}
      >
        {/* Frame reflection - omitted in performance mode */}
        {!performanceMode && (
          <div className="absolute inset-0 overflow-hidden rounded-[40px] pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-[35%] bg-gradient-to-b from-white/10 to-transparent opacity-30" />
          </div>
        )}
        
        {/* Phone screen */}
        <div className="rounded-[35px] overflow-hidden w-full h-full bg-black">
          {/* Content container */}
          <div className="w-full h-full relative">
            {children}
          </div>
        </div>
        
        {/* Volume buttons */}
        <div className="absolute top-[15%] left-[-2px] h-16 flex flex-col gap-2">
          <div className={`h-8 w-[3px] rounded-r-md ${colorSchemes[color].buttons}`} />
          <div className={`h-8 w-[3px] rounded-r-md ${colorSchemes[color].buttons}`} />
        </div>
        
        {/* Power button */}
        <div className="absolute top-[20%] right-[-2px] h-10">
          <div className={`h-10 w-[3px] rounded-l-md ${colorSchemes[color].buttons}`} />
        </div>
        
        {/* Bottom details - simplified in performance mode */}
        <div className="absolute bottom-[2%] left-0 right-0 flex justify-center">
          {performanceMode ? (
            <div className={`h-1 w-1/3 rounded-full ${colorSchemes[color].accent} opacity-80`} />
          ) : (
            <div className="flex items-center gap-2">
              <div className={`h-[3px] w-[30%] rounded-full ${colorSchemes[color].accent} opacity-80`} />
              <div className={`h-1 w-1 rounded-full ${colorSchemes[color].accent} opacity-50`} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
} 