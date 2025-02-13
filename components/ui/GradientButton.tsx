'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Button } from './button'
import { cn } from '@/lib/utils'

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  size?: 'default' | 'sm' | 'lg'
}

export function GradientButton({ children, className, size = 'default', ...props }: GradientButtonProps) {
  return (
    <Button
      size={size}
      className={cn(
        "relative overflow-hidden group whitespace-nowrap transition-shadow duration-200",
        "hover:shadow-[0_0_30px_-5px_rgba(138,128,249,0.6)]",
        className
      )}
      {...props}
    >
      {/* Base gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#8A80F9] via-[#5A51E1] to-[#8A80F9] bg-[length:200%_100%]"
        initial={{ backgroundPosition: "0% 0%" }}
        whileHover={{
          backgroundPosition: ["0% 0%", "200% 0%"]
        }}
        transition={{
          duration: 2,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      {/* Outer glow */}
      <motion.div
        className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 z-[-1] transition-opacity duration-200"
        style={{
          background: "radial-gradient(circle at center, rgba(138,128,249,0.7) 0%, transparent 70%)",
          filter: "blur(12px)",
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2 px-2">
        {children}
      </span>
    </Button>
  )
} 