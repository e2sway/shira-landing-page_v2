'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface OrbData {
  size: number
  opacity: number
  color: string
  xPos: number
  yPos: number
  duration: number
  delay: number
}

interface AnimatedBackgroundProps {
  className?: string
  orbCount?: number
  minSize?: number
  maxSize?: number
  minOpacity?: number
  maxOpacity?: number
  colors?: string[]
}

export function AnimatedBackground({
  className,
  orbCount = 6,
  minSize = 100,
  maxSize = 400,
  minOpacity = 0.05,
  maxOpacity = 0.15,
  colors = ['#8A80F9', '#5A51E1', '#9F97FF', '#7A72F6'],
}: AnimatedBackgroundProps) {
  const [orbs, setOrbs] = useState<OrbData[]>([])
  const [isClient, setIsClient] = useState(false)
  
  // Generate orbs only on the client side
  useEffect(() => {
    setIsClient(true)
    
    // Generate random orbs
    const generatedOrbs = Array.from({ length: orbCount }).map(() => {
      const size = Math.floor(Math.random() * (maxSize - minSize) + minSize)
      const opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity
      const color = colors[Math.floor(Math.random() * colors.length)]
      const xPos = Math.random() * 100
      const yPos = Math.random() * 100
      const duration = Math.random() * 20 + 20 // 20-40 seconds
      const delay = Math.random() * -20 // Random start position in the animation
      
      return { size, opacity, color, xPos, yPos, duration, delay }
    })
    
    setOrbs(generatedOrbs)
  }, [orbCount, minSize, maxSize, minOpacity, maxOpacity, colors])

  return (
    <div className={cn("fixed inset-0 overflow-hidden -z-10", className)}>
      {isClient && orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-3xl"
          style={{
            backgroundColor: orb.color,
            width: orb.size,
            height: orb.size,
            opacity: orb.opacity,
            left: `${orb.xPos}%`,
            top: `${orb.yPos}%`,
          }}
          animate={{
            x: [20, -20, 20],
            y: [20, -20, 20],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
    </div>
  )
} 