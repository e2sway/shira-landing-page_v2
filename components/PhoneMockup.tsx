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
      frame: 'bg-[#1a1825]',
      shadow: 'shadow-[0_0_40px_rgba(138,128,249,0.25)]',
      buttons: 'bg-[#2a2839]',
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
      {/* Hovering shadow effect */}
      <motion.div 
        className={`absolute -inset-8 bg-gradient-to-r from-[#8A80F9]/0 via-[#8A80F9]/5 to-[#8A80F9]/0 rounded-[3rem] opacity-0 blur-xl`}
        animate={{
          opacity: [0, 0.7, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Phone dimensions based on iPhone aspect ratio */}
      <div className="relative w-[300px] h-[650px] mx-auto">
        {/* Phone frame with enhanced reflection */}
        <div className={`absolute inset-0 ${scheme.frame} rounded-[2.5rem] ${scheme.shadow} backdrop-blur-xl overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_50px_rgba(138,128,249,0.4)]`}>
          {/* Subtle reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          
          {/* Enhanced side reflection */}
          <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-white/40 via-white/10 to-white/40" />
          <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          
          {/* Subtle frame texture */}
          <div className="absolute inset-0 opacity-10" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 5v1H0V0h5z'/%3E%3C/g%3E%3C/svg%3E")` 
          }} />
        </div>
        
        {/* Screen bezel with enhanced reflection */}
        <div className="absolute inset-[3px] bg-black rounded-[2.25rem] overflow-hidden">
          {/* Screen reflection */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-20"
            animate={{
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Screen content */}
        <div className="absolute inset-[3px] rounded-[2.25rem] overflow-hidden">
          <div className="w-full h-full relative">
            {children}
          </div>
        </div>

        {/* Volume buttons with animation */}
        <motion.div 
          className={`absolute left-[-2px] top-[100px] w-[4px] h-[30px] ${scheme.buttons} rounded-l-sm overflow-hidden`}
          whileHover={{ x: -2, backgroundColor: "#8A80F9" }}
        >
          <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-white/30 via-transparent to-white/10" />
        </motion.div>
        <motion.div 
          className={`absolute left-[-2px] top-[140px] w-[4px] h-[30px] ${scheme.buttons} rounded-l-sm overflow-hidden`}
          whileHover={{ x: -2, backgroundColor: "#8A80F9" }}
        >
          <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-white/30 via-transparent to-white/10" />
        </motion.div>
        
        {/* Power button with animation */}
        <motion.div 
          className={`absolute right-[-2px] top-[120px] w-[4px] h-[45px] ${scheme.buttons} rounded-r-sm overflow-hidden`}
          whileHover={{ x: 2, backgroundColor: "#8A80F9" }}
        >
          <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-white/30 via-transparent to-white/10" />
        </motion.div>
        
        {/* Bottom speaker and port */}
        <div className="absolute bottom-[14px] left-1/2 -translate-x-1/2 w-[140px] h-[5px] bg-[#282828] rounded-full flex items-center justify-center overflow-hidden">
          <div className="w-[50px] h-[2px] bg-[#333] rounded-full" />
          <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
        
        {/* Subtle phone shimmer effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 rounded-[2.5rem]"
          animate={{ 
            opacity: [0, 0.5, 0],
            left: ['-100%', '100%']
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity, 
            repeatDelay: 5
          }}
        />
      </div>
    </motion.div>
  )
} 