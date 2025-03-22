'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const defaultImages = [
  '/assets/screenshot5.png',
  '/assets/screenshot1.png',
  '/assets/screenshot4.png',
  '/assets/screenshot2.png',
  '/assets/screenshot3.png',
]

interface ImageCarouselProps {
  images?: string[]
  interval?: number
  autoPlay?: boolean
  transitionType?: 'slide' | 'fade' | 'zoom' | 'flip'
}

export function ImageCarousel({ 
  images = defaultImages, 
  interval = 4000,
  autoPlay = true,
  transitionType = 'slide'
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Handle automatic transitions
  useEffect(() => {
    if (!autoPlay || isPaused) return
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, interval)
    
    return () => clearInterval(timer)
  }, [images.length, interval, autoPlay, isPaused])

  // Define animation variants based on transition type
  const getVariants = () => {
    switch (transitionType) {
      case 'fade':
        return {
          enter: { opacity: 0 },
          center: { opacity: 1 },
          exit: { opacity: 0 }
        }
      case 'zoom':
        return {
          enter: { opacity: 0, scale: 0.8 },
          center: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.2 }
        }
      case 'flip':
        return {
          enter: { opacity: 0, rotateY: 90 },
          center: { opacity: 1, rotateY: 0 },
          exit: { opacity: 0, rotateY: -90 }
        }
      case 'slide':
      default:
        return {
          enter: (direction: number) => ({ 
            x: direction > 0 ? 300 : -300,
            opacity: 0
          }),
          center: { 
            x: 0,
            opacity: 1
          },
          exit: (direction: number) => ({ 
            x: direction < 0 ? 300 : -300,
            opacity: 0
          })
        }
    }
  }

  const variants = getVariants()
  const [[page, direction], setPage] = useState([0, 0])

  return (
    <div className="relative w-full h-full overflow-hidden group">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#8A80F9]/5 via-transparent to-[#8A80F9]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />
      
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            rotateY: { duration: 0.6 },
            scale: { duration: 0.5 }
          }}
          className="absolute inset-0 z-10"
        >
          <motion.div
            className="relative w-full h-full"
          >
            <Image
              src={images[currentIndex]}
              alt={`App screenshot ${currentIndex + 1}`}
              fill
              priority
              className="object-cover object-center scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Image enhancement layers */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-80" />
            <div className="absolute inset-0 mix-blend-overlay bg-gradient-to-br from-[#8A80F9]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Subtle shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
              initial={{ left: '-100%' }}
              animate={{ left: '100%' }}
              transition={{ 
                duration: 1.5, 
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 