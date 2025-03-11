'use client'
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ParallaxContainerProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: 'vertical' | 'horizontal'
  reverse?: boolean
  offset?: number
}

export function ParallaxContainer({
  children,
  className,
  speed = 0.5,
  direction = 'vertical',
  reverse = false,
  offset = 0,
}: ParallaxContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  // Calculate the movement range based on speed and direction
  const adjustedSpeed = reverse ? -speed : speed
  
  // Create transform values based on scroll progress
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === 'vertical' ? [offset, offset + 100 * adjustedSpeed] : [offset, offset]
  )
  
  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === 'horizontal' ? [offset, offset + 100 * adjustedSpeed] : [offset, offset]
  )

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      style={{ 
        y: direction === 'vertical' ? y : 0,
        x: direction === 'horizontal' ? x : 0,
      }}
    >
      {children}
    </motion.div>
  )
} 