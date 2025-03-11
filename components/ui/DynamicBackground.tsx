'use client'
import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface DynamicBackgroundProps {
  className?: string
  particleCount?: number
  enableMesh?: boolean
  enableParticles?: boolean
  primaryColor?: string
  secondaryColor?: string
  accentColor?: string
  gridSize?: number
}

export function DynamicBackground({
  className,
  particleCount = 50,
  enableMesh = true,
  enableParticles = true,
  primaryColor = '#8A80F9',
  secondaryColor = '#5A51E1',
  accentColor = '#9F97FF',
  gridSize = 30,
}: DynamicBackgroundProps) {
  const [isClient, setIsClient] = useState(false)
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    size: number
    speed: number
    opacity: number
    color: string
  }>>([])
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  
  // Initialize on client-side only
  useEffect(() => {
    setIsClient(true)
    
    if (enableParticles) {
      // Generate random particles
      const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.2,
        color: [primaryColor, secondaryColor, accentColor][Math.floor(Math.random() * 3)]
      }))
      
      setParticles(newParticles)
    }
    
    // Setup canvas for mesh gradient if enabled
    if (enableMesh && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      
      if (!ctx) return
      
      // Set canvas dimensions
      const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
      
      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)
      
      // Animation variables
      let time = 0
      const points = [
        { x: 0, y: 0, vx: 0.5, vy: 0.5 },
        { x: canvas.width, y: 0, vx: -0.5, vy: 0.5 },
        { x: 0, y: canvas.height, vx: 0.5, vy: -0.5 },
        { x: canvas.width, y: canvas.height, vx: -0.5, vy: -0.5 },
        { x: canvas.width / 2, y: canvas.height / 2, vx: 0.7, vy: 0.3 },
      ]
      
      // Animation function
      const animate = () => {
        if (!ctx || !canvas) return
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        // Update points
        time += 0.005
        points.forEach(point => {
          point.x += Math.sin(time) * point.vx
          point.y += Math.cos(time) * point.vy
          
          // Boundary check
          if (point.x < 0 || point.x > canvas.width) point.vx *= -1
          if (point.y < 0 || point.y > canvas.height) point.vy *= -1
        })
        
        // Create gradient mesh
        const gradient = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2, 0,
          canvas.width / 2, canvas.height / 2, canvas.width * 0.8
        )
        
        gradient.addColorStop(0, 'rgba(138, 128, 249, 0.05)')
        gradient.addColorStop(0.5, 'rgba(90, 81, 225, 0.03)')
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // Draw mesh
        ctx.beginPath()
        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            const p1 = points[i]
            const p2 = points[j]
            
            // Calculate distance for opacity
            const dx = p1.x - p2.x
            const dy = p1.y - p2.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const maxDistance = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height) / 2
            const opacity = 0.15 * (1 - distance / maxDistance)
            
            // Draw line
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(138, 128, 249, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
        
        // Continue animation
        animationRef.current = requestAnimationFrame(animate)
      }
      
      // Start animation
      animate()
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', resizeCanvas)
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
  }, [enableMesh, enableParticles, particleCount, primaryColor, secondaryColor, accentColor])
  
  return (
    <div className={cn("fixed inset-0 overflow-hidden -z-10", className)}>
      {/* Canvas for mesh gradient */}
      {enableMesh && (
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
      )}
      
      {/* Enhanced grid background */}
      <div className="absolute inset-0 mesh-grid opacity-40" style={{ backgroundSize: `${gridSize}px ${gridSize}px` }} />
      
      {/* Particles */}
      {isClient && enableParticles && particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: 3 + particle.speed * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * -5,
          }}
        />
      ))}
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full opacity-10 animate-pulse-slow" 
        style={{ 
          background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }} 
      />
      
      <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 rounded-full opacity-5 animate-float-slow" 
        style={{ 
          background: `radial-gradient(circle, ${secondaryColor} 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }} 
      />
      
      {/* Overlay to ensure content readability */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  )
} 