'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  yOffset?: number
  xOffset?: number
  rotateOffset?: number
  scale?: boolean
  performanceMode?: boolean
}

export function FloatingElement({
  children,
  className,
  delay = 0,
  duration = 4,
  yOffset = 10,
  xOffset = 0,
  rotateOffset = 0,
  scale = false,
  performanceMode = true,
}: FloatingElementProps) {
  // Adjust animation parameters for performance mode
  const actualYOffset = performanceMode ? Math.min(yOffset, 5) : yOffset
  const actualXOffset = performanceMode ? Math.min(xOffset, 3) : xOffset
  const actualRotateOffset = performanceMode ? 0 : rotateOffset // Disable rotation in performance mode
  const actualDuration = performanceMode ? Math.max(duration, 6) : duration // Slower animations are less CPU intensive
  
  return (
    <motion.div
      className={cn("relative", className)}
      initial={{ y: 0, x: 0, rotate: 0, scale: 1 }}
      animate={{
        y: [-actualYOffset, actualYOffset, -actualYOffset],
        x: actualXOffset ? [-actualXOffset, actualXOffset, -actualXOffset] : 0,
        rotate: actualRotateOffset ? [-actualRotateOffset, actualRotateOffset, -actualRotateOffset] : 0,
        scale: scale && !performanceMode ? [1, 1.05, 1] : 1, // Disable scale in performance mode
      }}
      style={{ willChange: 'transform' }}
      transition={{
        duration: actualDuration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  )
} 