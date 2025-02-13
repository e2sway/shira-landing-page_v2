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
      <div className="relative w-[320px] h-[660px] mx-auto">
        {/* Phone frame */}
        <div className="absolute inset-0 bg-[#181818] rounded-[3rem] shadow-[0_0_20px_rgba(0,0,0,0.3)] backdrop-blur-xl" />
        
        {/* Screen bezel */}
        <div className="absolute inset-[3px] bg-black rounded-[2.75rem]">
          {/* Dynamic Island */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[35px] bg-black rounded-b-[24px] z-10">
            <div className="absolute top-[8px] left-[24px] w-[12px] h-[12px] rounded-full bg-[#282828]" /> {/* Camera */}
            <div className="absolute top-[10px] right-[32px] w-[8px] h-[8px] rounded-full bg-[#282828]" /> {/* Sensor */}
          </div>
        </div>
        
        {/* Screen content */}
        <div className="absolute inset-[3px] rounded-[2.75rem] overflow-hidden">
          {children}
        </div>

        {/* Volume buttons */}
        <div className="absolute left-[-2px] top-[100px] w-[4px] h-[26px] bg-[#282828] rounded-l-sm" />
        <div className="absolute left-[-2px] top-[140px] w-[4px] h-[26px] bg-[#282828] rounded-l-sm" />
        
        {/* Power button */}
        <div className="absolute right-[-2px] top-[120px] w-[4px] h-[40px] bg-[#282828] rounded-r-sm" />
      </div>
    </motion.div>
  )
} 