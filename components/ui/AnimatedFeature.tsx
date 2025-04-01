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
      className="bg-[#222222] border border-[#333333] shadow-md p-6 rounded-lg relative overflow-hidden group"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5A51E1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Border highlight on hover */}
      <div className="absolute inset-0 rounded-lg border border-[#5A51E1]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon with glow effect */}
      <motion.div 
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#2a2a2a] mb-4 relative"
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.2 }
        }}
      >
        {/* Subtle border */}
        <div className="absolute inset-0 rounded-full border border-[#5A51E1]/20 group-hover:border-[#5A51E1]/40 transition-colors duration-300" />
        
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
          <span className="relative transition-all duration-300">
            {title}
            <motion.span 
              className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#5A51E1] group-hover:w-full transition-all duration-500"
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
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#5A51E1]/20">
          <path d="M0,0 L100,100 L100,0 L0,0" fill="currentColor" />
        </svg>
      </motion.div>
    </motion.div>
  )
} 