import React from 'react'
import { motion } from 'framer-motion'

interface PhoneMockupProps {
  children: React.ReactNode
  slideFrom?: 'left' | 'right'
}

export function PhoneMockup({ children, slideFrom = 'right' }: PhoneMockupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: slideFrom === 'left' ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative mx-auto"
    >
      <div className="relative w-[280px] h-[580px] mx-auto">
        {/* Phone frame */}
        <div className="absolute inset-0 bg-gray-900 rounded-[3rem] shadow-xl" />
        
        {/* Screen bezel */}
        <div className="absolute inset-2 bg-black rounded-[2.75rem]">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl" />
        </div>
        
        {/* Screen content */}
        <div className="absolute inset-2 rounded-[2.75rem] overflow-hidden">
          {children}
        </div>
      </div>
    </motion.div>
  )
} 