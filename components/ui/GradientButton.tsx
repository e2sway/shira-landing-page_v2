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
        "relative overflow-hidden group whitespace-nowrap transition-all duration-300",
        "hover:shadow-[0_0_35px_-5px_rgba(138,128,249,0.7)]",
        "focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-black",
        "active:scale-[0.98] active:shadow-[0_0_20px_-5px_rgba(138,128,249,0.5)]",
        className
      )}
      {...props}
    >
      {/* Base gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#8A80F9] via-[#5A51E1] to-[#8A80F9] bg-[length:200%_100%]"
        initial={{ backgroundPosition: "100% 0%" }}
        whileHover={{
          backgroundPosition: ["100% 0%", "0% 0%", "100% 0%"]
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-30"
        initial={{ 
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
          left: "-100%"
        }}
        whileHover={{ 
          left: "100%" 
        }}
        transition={{ 
          duration: 1.2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0.5
        }}
      />

      {/* Outer glow */}
      <motion.div
        className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 z-[-1] transition-opacity duration-300"
        initial={{ scale: 0.85, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        style={{
          background: "radial-gradient(circle at center, rgba(138,128,249,0.8) 0%, transparent 70%)",
          filter: "blur(15px)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Inner glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 70%)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.3)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <motion.span 
        className="relative z-10 flex items-center justify-center gap-2 px-2"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </Button>
  )
} 