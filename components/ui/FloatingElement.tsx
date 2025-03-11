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
}: FloatingElementProps) {
  return (
    <motion.div
      className={cn("relative", className)}
      initial={{ y: 0, x: 0, rotate: 0, scale: 1 }}
      animate={{
        y: [-yOffset, yOffset, -yOffset],
        x: [-xOffset, xOffset, -xOffset],
        rotate: [-rotateOffset, rotateOffset, -rotateOffset],
        scale: scale ? [1, 1.05, 1] : 1,
      }}
      transition={{
        duration: duration,
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