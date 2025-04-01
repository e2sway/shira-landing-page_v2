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
      {/* More visible border for unfocused state */}
      <div 
        className="absolute inset-0 rounded-xl border-2 border-[#333333]"
        style={{ zIndex: 0 }}
      />
      
      {/* Purple gradient border - only visible when focused */}
      <motion.div 
        className="absolute inset-0 rounded-xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isFocused ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        style={{
          background: 'linear-gradient(225deg, rgba(90, 81, 225, 0.7) 0%, rgba(110, 101, 231, 0.7) 100%)',
          zIndex: isFocused ? 1 : 0,
        }}
      />
      
      {/* Outer glow effect - only visible when focused */}
      <motion.div 
        className="absolute inset-0 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isFocused ? 0.8 : 0 
        }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: '0 0 15px 2px rgba(90, 81, 225, 0.3)',
          zIndex: isFocused ? 1 : 0,
        }}
      />
      
      {/* Input container - with subtle shadow for depth */}
      <div className="relative flex items-center gap-3 rounded-xl p-1 z-10">
        <div 
          className={`flex items-center gap-3 w-full rounded-lg px-4 py-3 transition-all duration-300
            ${isFocused 
              ? 'bg-[#2a2a2a] text-white shadow-lg' 
              : 'bg-[#222222] text-white/90 shadow-md'
            }`}
        >
          {/* Icon */}
          {icon && (
            <motion.div
              animate={{
                scale: isFocused ? 1.1 : 1,
                color: isFocused ? '#5A51E1' : 'rgba(255, 255, 255, 0.8)',
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
          
          {/* Button - full height to match input */}
          {buttonText && onButtonClick && (
            <button
              onClick={onButtonClick}
              className="bg-gradient-to-r from-[#5A51E1] to-[#6E65E7] text-white px-4 h-full -my-3 rounded-lg font-medium text-sm hover:shadow-lg transition duration-300 hover:brightness-110 hover:scale-[1.03] flex items-center justify-center"
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  )
} 