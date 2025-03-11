'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedFeatureProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
  iconClassName?: string
  delay?: number
}

export function AnimatedFeature({
  icon,
  title,
  description,
  className,
  iconClassName,
  delay = 0,
}: AnimatedFeatureProps) {
  return (
    <motion.div
      className={cn(
        "flex flex-col items-start gap-4 p-6 rounded-xl glass-effect border border-white/10 hover:border-purple-500/30 transition-all",
        "relative overflow-hidden",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 30px -10px rgba(138, 128, 249, 0.2)"
      }}
    >
      {/* Shimmer effect on hover */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
        initial={{ x: "-100%" }}
        whileHover={{ x: "200%" }}
        transition={{ duration: 1.5 }}
      />
      
      <motion.div
        className={cn(
          "flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600/20 to-purple-800/20 text-[#8A80F9]",
          "relative overflow-hidden",
          iconClassName
        )}
        initial={{ scale: 0.8, rotate: -5 }}
        whileInView={{ scale: 1, rotate: 0 }}
        whileHover={{ 
          scale: 1.1, 
          rotate: 5,
          background: "linear-gradient(to bottom right, rgba(138, 128, 249, 0.3), rgba(90, 81, 225, 0.3))",
          color: "#8A80F9"
        }}
        transition={{
          duration: 0.3,
          delay: delay + 0.1,
        }}
      >
        {/* Glow effect */}
        <motion.div 
          className="absolute inset-0 opacity-0 rounded-lg"
          whileHover={{ opacity: 0.5 }}
          style={{
            background: "radial-gradient(circle at center, rgba(138, 128, 249, 0.8) 0%, transparent 70%)",
            filter: "blur(5px)"
          }}
        />
        
        {icon}
      </motion.div>
      
      <div>
        <motion.h3
          className="text-lg font-semibold mb-1 text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: delay + 0.2, duration: 0.3 }}
        >
          {title}
        </motion.h3>
        
        <motion.p
          className="text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: delay + 0.3, duration: 0.3 }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  )
} 