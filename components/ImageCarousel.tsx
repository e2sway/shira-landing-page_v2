'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
  showControls?: boolean
  showIndicators?: boolean
  transitionType?: 'slide' | 'fade' | 'zoom' | 'flip'
}

export function ImageCarousel({ 
  images = defaultImages, 
  interval = 4000,
  autoPlay = true,
  showControls = true,
  showIndicators = true,
  transitionType = 'slide'
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // Handle automatic transitions
  useEffect(() => {
    if (!autoPlay || isPaused) return
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, interval)
    
    return () => clearInterval(timer)
  }, [images.length, interval, autoPlay, isPaused])

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

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

  const paginate = useCallback((newDirection: number) => {
    const newIndex = (currentIndex + newDirection + images.length) % images.length
    setPage([newIndex, newDirection])
    setCurrentIndex(newIndex)
  }, [currentIndex, images.length])

  return (
    <div 
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
            opacity: { duration: 0.2 },
            rotateY: { duration: 0.4 },
            scale: { duration: 0.4 }
          }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`App screenshot ${currentIndex + 1}`}
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Image overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-50" />
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation controls */}
      {showControls && (
        <>
          <motion.button
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white z-10"
            onClick={() => paginate(-1)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(138, 128, 249, 0.5)" }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={18} />
          </motion.button>
          
          <motion.button
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white z-10"
            onClick={() => paginate(1)}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(138, 128, 249, 0.5)" }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={18} />
          </motion.button>
        </>
      )}
      
      {/* Indicators */}
      {showIndicators && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-[#8A80F9]' : 'bg-white/40'
              }`}
              onClick={() => {
                const direction = index > currentIndex ? 1 : -1
                setPage([index, direction])
                setCurrentIndex(index)
              }}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
              animate={{ 
                scale: index === currentIndex ? 1.2 : 1,
                backgroundColor: index === currentIndex ? "#8A80F9" : "rgba(255, 255, 255, 0.4)"
              }}
            />
          ))}
        </div>
      )}
      
      {/* Play/Pause button */}
      <motion.button
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white z-10"
        onClick={() => setIsPaused(!isPaused)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(138, 128, 249, 0.5)" }}
        whileTap={{ scale: 0.9 }}
      >
        {isPaused ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5.14v14l11-7-11-7z" fill="currentColor" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" fill="currentColor" />
          </svg>
        )}
      </motion.button>
    </div>
  )
} 