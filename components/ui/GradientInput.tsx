'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface GradientInputProps {
  type?: string
  name?: string
  placeholder?: string
  icon?: React.ReactNode
  buttonText?: string
  onButtonClick?: () => void
  className?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function GradientInput({
  type = 'text',
  name,
  placeholder,
  icon,
  buttonText,
  onButtonClick,
  className,
  value,
  onChange,
}: GradientInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {/* Animated gradient border */}
      <motion.div 
        className="absolute inset-0 rounded-xl"
        style={{
          background: 'linear-gradient(225deg, rgba(138, 128, 249, 0.5) 0%, rgba(82, 71, 205, 0.5) 100%)',
          zIndex: 0,
        }}
        animate={{ 
          opacity: isFocused ? 1 : 0.3,
          scale: isFocused ? 1 : 0.98,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Outer glow effect */}
      <motion.div 
        className="absolute inset-0 rounded-xl"
        style={{
          boxShadow: '0 0 20px 2px rgba(138, 128, 249, 0.3)',
          zIndex: 0,
        }}
        animate={{ 
          opacity: isFocused ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Input container */}
      <div className="relative flex items-center gap-3 rounded-xl backdrop-blur-xl p-1 z-10">
        <div 
          className={`flex items-center gap-3 w-full rounded-lg px-4 py-3 transition-colors
            ${isFocused 
              ? 'bg-white/10 text-white' 
              : 'bg-white/5 text-white/70'
            }`}
        >
          {/* Icon */}
          {icon && (
            <motion.div
              animate={{
                scale: isFocused ? 1.1 : 1,
                color: isFocused ? '#8A80F9' : 'rgba(255, 255, 255, 0.7)',
              }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0"
            >
              {icon}
            </motion.div>
          )}
          
          {/* Input */}
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none border-none text-inherit placeholder:text-gray-400"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={value}
            onChange={onChange}
          />
          
          {/* Button */}
          {buttonText && onButtonClick && (
            <button
              onClick={onButtonClick}
              className="bg-gradient-to-r from-[#8A80F9] to-[#A78BFA] text-white px-4 py-2 rounded-lg font-medium text-sm hover:shadow-lg transition duration-300 hover:brightness-110 hover:scale-[1.03]"
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  )
} 