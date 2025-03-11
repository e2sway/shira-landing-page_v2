'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedTextProps {
  text: string | string[]
  className?: string
  highlightClassName?: string
  highlightWords?: string[]
  delay?: number
  staggerChildren?: number
  once?: boolean
}

export function AnimatedText({
  text,
  className,
  highlightClassName = "bg-clip-text text-transparent bg-gradient-to-r from-[#8A80F9] to-[#5A51E1]",
  highlightWords = [],
  delay = 0,
  staggerChildren = 0.015,
  once = true,
}: AnimatedTextProps) {
  const words = Array.isArray(text) ? text : text.split(' ')
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: staggerChildren, 
        delayChildren: delay,
      },
    }),
  }
  
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      className={cn("flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, index) => {
        const isHighlighted = highlightWords.includes(word)
        return (
          <motion.span
            key={index}
            className={cn(
              "mr-1 mb-1",
              isHighlighted ? highlightClassName : ""
            )}
            variants={child}
          >
            {word}
          </motion.span>
        )
      })}
    </motion.div>
  )
} 