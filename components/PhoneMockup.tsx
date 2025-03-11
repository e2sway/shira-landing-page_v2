'use client'
import React from 'react'
import { motion } from 'framer-motion'

interface PhoneMockupProps {
  children: React.ReactNode
  slideFrom?: 'left' | 'right'
  color?: 'black' | 'white' | 'purple'
}

export function PhoneMockup({ 
  children, 
  slideFrom = 'right',
  color = 'black'
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
      frame: 'bg-[#2d2b38]',
      shadow: 'shadow-[0_0_30px_rgba(138,128,249,0.3)]',
      buttons: 'bg-[#3a3846]',
      accent: 'bg-[#8A80F9]'
    }
  }

  const scheme = colorSchemes[color]

  return (
    <motion.div
      initial={{ opacity: 0, x: slideFrom === 'left' ? -100 : 100, rotateY: slideFrom === 'left' ? 10 : -10 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay: 0.2,
        type: "spring",
        damping: 20,
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.02,
        rotateY: slideFrom === 'left' ? -5 : 5,
        transition: { duration: 0.3 }
      }}
      className="relative mx-auto perspective-1000"
    >
      <div className="relative w-[320px] h-[660px] mx-auto">
        {/* Phone frame with reflection */}
        <div className={`absolute inset-0 ${scheme.frame} rounded-[3rem] ${scheme.shadow} backdrop-blur-xl overflow-hidden`}>
          {/* Subtle reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          
          {/* Side reflection */}
          <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-white/30 via-white/10 to-white/30" />
          <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
        
        {/* Screen bezel with reflection */}
        <div className="absolute inset-[3px] bg-black rounded-[2.75rem] overflow-hidden">
          {/* Screen reflection */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-20" />
        </div>
        
        {/* Screen content */}
        <div className="absolute inset-[3px] rounded-[2.75rem] overflow-hidden">
          {children}
        </div>

        {/* Volume buttons with animation */}
        <motion.div 
          className={`absolute left-[-2px] top-[100px] w-[4px] h-[26px] ${scheme.buttons} rounded-l-sm`}
          whileHover={{ x: -1, backgroundColor: "#8A80F9" }}
        />
        <motion.div 
          className={`absolute left-[-2px] top-[140px] w-[4px] h-[26px] ${scheme.buttons} rounded-l-sm`}
          whileHover={{ x: -1, backgroundColor: "#8A80F9" }}
        />
        
        {/* Power button with animation */}
        <motion.div 
          className={`absolute right-[-2px] top-[120px] w-[4px] h-[40px] ${scheme.buttons} rounded-r-sm`}
          whileHover={{ x: 1, backgroundColor: "#8A80F9" }}
        />
        
        {/* Bottom speaker and port */}
        <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-[#282828] rounded-full flex items-center justify-center">
          <div className="w-[40px] h-[2px] bg-[#333] rounded-full" />
        </div>
      </div>
    </motion.div>
  )
} 