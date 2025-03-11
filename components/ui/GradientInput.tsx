'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from './input'
import { cn } from '@/lib/utils'

interface GradientInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  containerClassName?: string
  icon?: React.ReactNode
}

export function GradientInput({ 
  className, 
  containerClassName,
  icon,
  ...props 
}: GradientInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <motion.div 
      className={cn(
        "relative group",
        containerClassName
      )}
      animate={{
        boxShadow: isFocused 
          ? "0 0 20px -5px rgba(138,128,249,0.5)" 
          : "0 2px 8px rgba(0,0,0,0.15)"
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Border gradient */}
      <motion.div
        className="absolute -inset-[1px] rounded-xl z-0 opacity-0 transition-opacity duration-300"
        animate={{ 
          opacity: isFocused ? 1 : 0,
          background: isFocused 
            ? "linear-gradient(to right, rgba(138,128,249,0.8), rgba(90,81,225,0.8))" 
            : "transparent"
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Input */}
      <Input
        className={cn(
          "relative z-10 h-14 text-lg bg-[#282828] border-none rounded-xl px-6 text-white",
          "placeholder:text-[#CFCFCF] focus:ring-0 shadow-none",
          "transition-colors duration-300",
          icon && "pl-12",
          className
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />

      {/* Icon */}
      {icon && (
        <motion.div 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-20"
          animate={{ 
            color: isFocused ? "#8A80F9" : "#CFCFCF" 
          }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
      )}

      {/* Focus glow */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 z-0"
        animate={{ 
          opacity: isFocused ? 0.5 : 0,
        }}
        style={{
          boxShadow: "0 0 15px 2px rgba(138,128,249,0.5)",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
} 