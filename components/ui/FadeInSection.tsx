'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FadeInSectionProps {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  duration?: number
  distance?: number
  once?: boolean
  threshold?: number
  performanceMode?: boolean
}

export function FadeInSection({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  distance = 30,
  once = true,
  threshold = 0.1,
  performanceMode = true,
}: FadeInSectionProps) {
  // Adjust animation parameters for performance mode
  const actualDistance = performanceMode ? Math.floor(distance * 0.6) : distance
  const actualDuration = performanceMode ? Math.min(duration, 0.4) : duration
  
  // Set initial animation values based on direction
  const getInitialPosition = () => {
    // Simplified for performance mode
    if (performanceMode && direction !== 'none') {
      return { 
        opacity: 0,
        [direction === 'up' || direction === 'down' ? 'y' : 'x']: 
          direction === 'up' || direction === 'left' 
            ? actualDistance 
            : -actualDistance
      }
    }
    
    switch (direction) {
      case 'up':
        return { opacity: 0, y: actualDistance }
      case 'down':
        return { opacity: 0, y: -actualDistance }
      case 'left':
        return { opacity: 0, x: actualDistance }
      case 'right':
        return { opacity: 0, x: -actualDistance }
      case 'none':
        return { opacity: 0 }
      default:
        return { opacity: 0, y: actualDistance }
    }
  }

  // Set animation target values
  const getAnimatePosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 }
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 }
      case 'none':
        return { opacity: 1 }
      default:
        return { opacity: 1, y: 0 }
    }
  }

  return (
    <motion.div
      className={cn(className)}
      initial={getInitialPosition()}
      whileInView={getAnimatePosition()}
      viewport={{ once, amount: threshold }}
      style={{ willChange: 'transform, opacity' }}
      transition={{
        duration: actualDuration,
        delay,
        ease: performanceMode ? "easeOut" : [0.22, 1, 0.36, 1], // Simpler easing in performance mode
      }}
    >
      {children}
    </motion.div>
  )
} 