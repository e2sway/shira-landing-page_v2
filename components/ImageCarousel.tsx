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
  performanceMode?: boolean
}

export function ImageCarousel({ 
  images = defaultImages, 
  interval = 4000,
  autoPlay = true,
  transitionType = 'fade',
  performanceMode = true
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isImagesLoaded, setIsImagesLoaded] = useState(false)

  // Use useEffect to set isMounted to true after component mounts with a slight delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true)
    }, 150);
    
    return () => clearTimeout(timer);
  }, [])

  // Preload images
  useEffect(() => {
    if (!isMounted) return;
    
    const preloadImages = async () => {
      try {
        const imagePromises = images.map(src => {
          return new Promise((resolve, reject) => {
            const img = new globalThis.Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
          });
        });
        
        await Promise.all(imagePromises);
        setIsImagesLoaded(true);
      } catch (error) {
        console.error('Failed to preload images:', error);
        // Still set images as loaded to ensure UI renders even if some images fail
        setIsImagesLoaded(true);
      }
    };
    
    preloadImages();
  }, [images, isMounted]);

  // Handle automatic transitions
  useEffect(() => {
    if (!autoPlay || isPaused || !isMounted || !isImagesLoaded) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, performanceMode ? interval * 1.5 : interval);
    
    return () => clearInterval(timer);
  }, [images.length, interval, autoPlay, isPaused, performanceMode, isMounted, isImagesLoaded]);

  // Define animation variants based on transition type
  const getVariants = () => {
    if (performanceMode) {
      return {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 }
      }
    }
    
    switch (transitionType) {
      case 'fade':
        return {
          enter: { opacity: 0 },
          center: { opacity: 1 },
          exit: { opacity: 0 }
        }
      case 'zoom':
        return {
          enter: { opacity: 0, scale: 0.9 },
          center: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.1 }
        }
      case 'flip':
        return {
          enter: { opacity: 0, rotateY: 45 },
          center: { opacity: 1, rotateY: 0 },
          exit: { opacity: 0, rotateY: -45 }
        }
      case 'slide':
      default:
        return {
          enter: (direction: number) => ({ 
            x: direction > 0 ? 150 : -150,
            opacity: 0
          }),
          center: { 
            x: 0,
            opacity: 1
          },
          exit: (direction: number) => ({ 
            x: direction < 0 ? 150 : -150,
            opacity: 0
          })
        }
    }
  }

  const variants = getVariants()
  const [[page, direction], setPage] = useState([0, 0])

  // Get optimized transition settings based on performance mode
  const getTransitionSettings = () => {
    if (performanceMode) {
      return {
        duration: 0.4
      }
    }
    
    return {
      x: { type: "spring", stiffness: 200, damping: 25 },
      opacity: { duration: 0.4 },
      rotateY: { duration: 0.5 },
      scale: { duration: 0.4 }
    }
  }

  // If not mounted yet or images aren't loaded, render a placeholder
  if (!isMounted || !isImagesLoaded) {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden group">
      {/* Background glow effect - simplified in performance mode */}
      {!performanceMode && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#8A80F9]/5 via-transparent to-[#8A80F9]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />
      )}
      
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={getTransitionSettings()}
          className="absolute inset-0 z-[1]"
          style={{ willChange: 'transform, opacity' }}
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
            
            {/* Image enhancement layers - reduced in performance mode */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-80" />
            
            {!performanceMode && (
              <>
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
              </>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 