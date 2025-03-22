'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedFeatureProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
  iconClassName?: string
  delay?: number
}

export function AnimatedFeature({
  icon,
  title,
  description,
  className,
  iconClassName,
  delay = 0,
}: AnimatedFeatureProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: "easeOut" 
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="glass-card p-6 relative overflow-hidden group"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8A80F9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 animate-shimmer transition-opacity duration-300" />
      
      {/* Border gradient */}
      <div className="absolute inset-0 rounded-xl neon-border opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon with glow effect */}
      <motion.div 
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#8A80F9]/10 text-[#8A80F9] mb-4 relative"
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.2 }
        }}
      >
        {/* Icon glow */}
        <div className="absolute inset-0 rounded-full animate-pulse-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rotating gradient border */}
        <div className="absolute inset-[-1px] rounded-full overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-[#8A80F9] via-[#5A51E1] to-[#8A80F9] opacity-30 group-hover:opacity-70 transition-opacity duration-500 animate-gradient-shift"
            style={{ backgroundSize: '200% 200%' }}
          />
        </div>
        
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 2, 0, -2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative z-10"
        >
          {icon}
        </motion.div>
      </motion.div>
      
      {/* Text content */}
      <div className="space-y-2">
        <motion.h3 
          className="text-lg font-semibold text-white"
          initial={{ opacity: 0.9 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="relative group-hover:neon-text transition-all duration-300">
            {title}
            <motion.span 
              className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#8A80F9] group-hover:w-full transition-all duration-500"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ delay: delay + 0.5, duration: 0.5 }}
            />
          </span>
        </motion.h3>
        
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
      </div>
      
      {/* Hover indicator */}
      <motion.div 
        className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#8A80F9]/20">
          <path d="M0,0 L100,100 L100,0 L0,0" fill="currentColor" />
        </svg>
      </motion.div>
    </motion.div>
  )
} 