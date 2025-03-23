'use client'
import React, { useEffect, useState, useRef, useMemo } from 'react'
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
  enableMeteors?: boolean
  enableOrbs?: boolean
  performanceMode?: boolean
  gridSize?: number
}

export function DynamicBackground({
  className,
  particleCount = 30,
  enableMesh = true,
  enableParticles = true,
  primaryColor = '#8A80F9',
  secondaryColor = '#5A51E1',
  accentColor = '#9F97FF',
  enableMeteors = false,
  enableOrbs = true,
  performanceMode = true,
  gridSize = 30,
}: DynamicBackgroundProps) {
  const [isClient, setIsClient] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  
  const particles = useMemo(() => {
    if (!enableParticles) return []
    
    return Array.from({ length: performanceMode ? Math.floor(particleCount / 2) : particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.4 + 0.1,
      color: [primaryColor, secondaryColor, accentColor][Math.floor(Math.random() * 3)]
    }))
  }, [enableParticles, particleCount, primaryColor, secondaryColor, accentColor, performanceMode])
  
  const meteors = useMemo(() => {
    if (!enableMeteors) return []
    
    return Array.from({ length: performanceMode ? 3 : 6 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100 + 50,
      y: Math.random() * -50,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 15
    }))
  }, [enableMeteors, performanceMode])
  
  useEffect(() => {
    setIsClient(true)
    
    if (enableMesh && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d', { alpha: true })
      
      if (!ctx) return
      
      const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
      
      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)
      
      let time = 0
      
      const points = performanceMode ? [
        { x: 0, y: 0, vx: 0.3, vy: 0.3 },
        { x: canvas.width, y: 0, vx: -0.3, vy: 0.3 },
        { x: 0, y: canvas.height, vx: 0.3, vy: -0.3 },
        { x: canvas.width, y: canvas.height, vx: -0.3, vy: -0.3 },
        { x: canvas.width / 2, y: canvas.height / 2, vx: 0.5, vy: 0.2 },
      ] : [
        { x: 0, y: 0, vx: 0.5, vy: 0.5 },
        { x: canvas.width, y: 0, vx: -0.5, vy: 0.5 },
        { x: 0, y: canvas.height, vx: 0.5, vy: -0.5 },
        { x: canvas.width, y: canvas.height, vx: -0.5, vy: -0.5 },
        { x: canvas.width / 2, y: canvas.height / 2, vx: 0.7, vy: 0.3 },
        { x: canvas.width / 3, y: canvas.height / 3, vx: -0.3, vy: 0.6 },
        { x: canvas.width * 2/3, y: canvas.height * 2/3, vx: 0.4, vy: -0.5 },
      ]
      
      const animate = () => {
        if (!ctx || !canvas) return
        
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        time += performanceMode ? 0.003 : 0.005
        points.forEach(point => {
          point.x += Math.sin(time) * point.vx
          point.y += Math.cos(time) * point.vy
          
          if (point.x < 0 || point.x > canvas.width) point.vx *= -1
          if (point.y < 0 || point.y > canvas.height) point.vy *= -1
        })
        
        const gradient = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2, 0,
          canvas.width / 2, canvas.height / 2, canvas.width * 0.8
        )
        
        gradient.addColorStop(0, 'rgba(138, 128, 249, 0.06)')
        gradient.addColorStop(0.5, 'rgba(90, 81, 225, 0.04)')
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        if (performanceMode) {
          for (let i = 0; i < points.length; i++) {
            const nextIndex = (i + 1) % points.length
            const p1 = points[i]
            const p2 = points[nextIndex]
            
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = 'rgba(138, 128, 249, 0.1)'
            ctx.lineWidth = 1
            ctx.stroke()
          }
        } else {
          for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
              const p1 = points[i]
              const p2 = points[j]
              
              const dx = p1.x - p2.x
              const dy = p1.y - p2.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              const maxDistance = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height) / 2
              const opacity = 0.15 * (1 - distance / maxDistance)
              
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.strokeStyle = `rgba(138, 128, 249, ${opacity})`
              ctx.lineWidth = 1.5
              ctx.stroke()
              
              if (!performanceMode) {
                const midX = (p1.x + p2.x) / 2
                const midY = (p1.y + p2.y) / 2
                
                const glowGradient = ctx.createRadialGradient(
                  midX, midY, 0,
                  midX, midY, 20
                )
                
                glowGradient.addColorStop(0, `rgba(138, 128, 249, ${opacity * 2})`)
                glowGradient.addColorStop(1, 'rgba(138, 128, 249, 0)')
                
                ctx.beginPath()
                ctx.fillStyle = glowGradient
                ctx.arc(midX, midY, 20, 0, Math.PI * 2)
                ctx.fill()
              }
            }
          }
        }
        
        animationRef.current = requestAnimationFrame(animate)
      }
      
      animate()
      
      return () => {
        window.removeEventListener('resize', resizeCanvas)
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
  }, [enableMesh, performanceMode])
  
  return (
    <div className={cn("fixed inset-0 overflow-hidden -z-10", className)}>
      {enableMesh && (
        <>
          <canvas 
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ willChange: 'transform' }}
          />
          <div 
            className="mesh-grid absolute inset-0 w-full h-full opacity-30" 
            style={{ 
              backgroundSize: `${gridSize}px ${gridSize}px`,
              willChange: 'background-color'
            }} 
          />
        </>
      )}
      
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
            willChange: 'transform',
          }}
          animate={{
            y: performanceMode 
              ? [0, -10, 0]
              : [0, -20, 0],
            opacity: performanceMode
              ? [particle.opacity]
              : [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: 3 + particle.speed * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * -5,
          }}
        />
      ))}
      
      {isClient && enableMeteors && meteors.map(meteor => (
        <motion.div
          key={`meteor-${meteor.id}`}
          className="absolute"
          style={{ willChange: 'transform' }}
          initial={{ 
            x: `${meteor.x}%`, 
            y: `${meteor.y}%`,
            rotate: -15,
            opacity: 0
          }}
          animate={{ 
            x: `${meteor.x - 100}%`, 
            y: `${meteor.y + 100}%`,
            rotate: 25,
            opacity: [0, 1, 0] 
          }}
          transition={{
            duration: meteor.duration,
            ease: "easeIn",
            delay: meteor.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 10 + 10
          }}
        >
          <div 
            className="h-[50px] w-[1px] bg-gradient-to-b from-transparent via-white to-[#8A80F9]"
            style={{ 
              boxShadow: performanceMode ? 'none' : '0 0 20px rgba(138, 128, 249, 0.7)',
              transform: 'rotate(15deg)'
            }}
          />
        </motion.div>
      ))}
      
      {isClient && enableOrbs && (
        <>
          <div 
            className="absolute top-1/4 left-1/4 rounded-full opacity-10 animate-orb-glow" 
            style={{ 
              width: performanceMode ? '30vw' : '40vw',
              height: performanceMode ? '30vw' : '40vw',
              background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)`,
              filter: performanceMode ? 'blur(40px)' : 'blur(60px)',
              willChange: 'transform',
            }} 
          />
          
          {!performanceMode && (
            <div 
              className="absolute bottom-1/4 right-1/4 w-[25vw] h-[25vw] rounded-full opacity-5 animate-orb-glow" 
              style={{ 
                background: `radial-gradient(circle, ${secondaryColor} 0%, transparent 70%)`,
                filter: 'blur(40px)',
                animationDelay: '1s',
                willChange: 'transform',
              }} 
            />
          )}
          
          <div 
            className="absolute top-3/4 left-2/3 rounded-full opacity-8 animate-orb-glow" 
            style={{ 
              width: performanceMode ? '20vw' : '30vw',
              height: performanceMode ? '20vw' : '30vw',
              background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
              filter: performanceMode ? 'blur(50px)' : 'blur(80px)',
              animationDelay: '2s',
              willChange: 'transform',
            }} 
          />
        </>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f13] via-transparent to-[#0f0f13] opacity-80" />
    </div>
  )
} 