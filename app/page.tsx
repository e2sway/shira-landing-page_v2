// Force Vercel update - timestamp: 2025-03-23T05:24:41Z
'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { MessageCircle, Globe2, Brain, Trophy, ChevronRight, Mail } from 'lucide-react'
import { ImageCarousel } from "@/components/ImageCarousel"
import { GradientButton } from "@/components/ui/GradientButton"
import { useEmailSubmission } from '@/lib/hooks/useEmailSubmission'
import { Toaster } from 'react-hot-toast'
import { FadeInSection } from '@/components/ui/FadeInSection'
import { AnimatedFeature } from '@/components/ui/AnimatedFeature'
import { GradientInput } from '@/components/ui/GradientInput'
import { ModernIPhoneMockup } from "@/components/ModernIPhoneMockup"
import { ScrollTextReveal } from '@/components/ui/ScrollTextReveal'
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar'

export default function Home() {
  const [email, setEmail] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  const { submitEmail, isLoading } = useEmailSubmission()

  // Client-side only mounting to prevent hydration issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitEmail(email)
    setEmail('') // Clear the input on success
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  return (
    <main className="min-h-screen bg-[#181818] overflow-x-hidden">
      <Toaster position="top-center" />
      {isMounted && <ScrollProgressBar color="#8A80F9" height={3} />}
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-16 md:pt-safe pb-16">
        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Phone Mockup - LEFT SIDE */}
            <div className="order-1 mb-8 md:mb-0 md:order-1 min-h-[600px] relative">
              <div className="flex justify-center mx-auto max-w-sm w-full">
                <div className="relative max-w-[300px] w-full h-[600px]">
                  <div className="absolute -inset-16 bg-gradient-to-r from-[#5A51E1]/5 to-[#8A80F9]/5 rounded-full blur-3xl opacity-50"></div>
                  <div className="relative group z-10 h-full w-full transform-gpu">
                    <ModernIPhoneMockup 
                      color="space-black" 
                      variant="iPhone15Pro" 
                      performanceMode={false} 
                      slideFrom="left" 
                      parallaxStrength={0.15}
                      interactiveDynamicIsland={false}
                      hideNotch={false}
                    >
                      <div className="relative w-full h-full bg-black overflow-hidden">
                        <ImageCarousel 
                          transitionType="fade"
                          interval={5000}
                          performanceMode={true}
                        />
                      </div>
                    </ModernIPhoneMockup>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Text and Form - RIGHT SIDE */}
            <div className="order-2 md:order-2">
              <div className="mb-8">
                <ScrollTextReveal 
                  tag="h1" 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tighter text-center"
                  stagger={0.05}
                >
                  <span className="gradient-text animate-text-shimmer block">Say Hi To Shira</span>
                  <span className="block mt-2">Turn Endless Scrolling Into Language Learning</span>
                </ScrollTextReveal>
                
                <ScrollTextReveal 
                  tag="p" 
                  className="text-gray-300 text-lg mb-8 text-center"
                  stagger={0.08}
                  delay={0.3}
                >
                  Our AI-powered app transforms your daily social media habits into language learning opportunities. Experience immersive learning that adapts to your interests and skill level.
                </ScrollTextReveal>
              </div>
              
              <FadeInSection direction="left" performanceMode={true}>
                <div className="bg-[#222222] border border-[#333333] shadow-lg p-6 rounded-2xl mb-8">
                  <h2 className="text-xl font-bold mb-4 text-center text-white">Join Our Waitlist</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <GradientInput
                        type="email"
                        placeholder="Enter your email"
                        name="email" 
                        className="w-full"
                        icon={<Mail size={20} />}
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </div>
                    
                    <GradientButton 
                      type="submit"
                      size="lg" 
                      className="w-full h-14 px-10 text-lg font-bold rounded-xl bg-gradient-to-r from-[#5A51E1] to-[#6E65E7]"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Joining...' : 'Join Waitlist'}
                      {!isLoading && <ChevronRight className="h-5 w-5 ml-2" />}
                    </GradientButton>
                  </form>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Benefits Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <ScrollTextReveal 
              tag="div"
              className="flex flex-col items-center"
              stagger={0.08}
            >
              <span className="text-sm font-semibold text-[#8A80F9] mb-2 block uppercase tracking-wide">FEATURES & BENEFITS</span>
              <h2 className="text-4xl md:text-5xl font-bold gradient-text animate-text-shimmer">Key Benefits</h2>
            </ScrollTextReveal>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Features - Left Side */}
            <div>
              <div className="grid sm:grid-cols-2 gap-8">
                <AnimatedFeature
                  icon={<MessageCircle className="w-6 h-6 text-[#5A51E1]" />}
                  title="Learn through real-life conversations"
                  description="Absorb language naturally with engaging short-form videos"
                  delay={0.2}
                />

                <AnimatedFeature
                  icon={<Globe2 className="w-6 h-6 text-[#5A51E1]" />}
                  title="Cultural immersion"
                  description="Master idioms, social norms, and expressions used by native speakers"
                  delay={0.3}
                />

                <AnimatedFeature
                  icon={<Brain className="w-6 h-6 text-[#5A51E1]" />}
                  title="AI-powered feedback"
                  description="Improve pronunciation and fluency with real-time voice analysis"
                  delay={0.4}
                />

                <AnimatedFeature
                  icon={<Trophy className="w-6 h-6 text-[#5A51E1]" />}
                  title="Personalized progress tracking"
                  description="Stay motivated with streak rewards and adaptive learning"
                  delay={0.5}
                />
              </div>
            </div>

            {/* Phone Mockup - Right Side */}
            <div className="flex justify-center lg:justify-end pt-8 lg:pt-0">
              <div className="relative max-w-[300px] w-full h-[600px]">
                <div className="absolute -inset-16 bg-gradient-to-r from-[#5A51E1]/5 to-[#8A80F9]/5 rounded-full blur-3xl opacity-50"></div>
                <div className="relative group z-10 h-full w-full transform-gpu">
                  <ModernIPhoneMockup 
                    color="space-black" 
                    variant="iPhone15Pro" 
                    performanceMode={false} 
                    slideFrom="right" 
                    parallaxStrength={0.25}
                    interactiveDynamicIsland={false}
                    hideNotch={false}
                  >
                    <div className="relative w-full h-full bg-black overflow-hidden">
                      <Image
                        src="/assets/screenshot7.png"
                        alt="App feature showcase"
                        fill
                        priority
                        className="object-cover object-center scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
                    </div>
                  </ModernIPhoneMockup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollTextReveal
              tag="div"
              className="flex flex-col items-center mb-6"
              stagger={0.08}
            >
              <span className="text-sm font-semibold text-[#8A80F9] mb-2 block uppercase tracking-wide">GET STARTED</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                Ready to Transform Your Language Learning?
              </h2>
            </ScrollTextReveal>
            
            <ScrollTextReveal
              tag="p"
              className="text-xl mb-12 text-gray-300"
              stagger={0.1}
              delay={0.3}
            >
              Join our waitlist for exclusive early access and special perks
            </ScrollTextReveal>
            
            <FadeInSection direction="up" delay={0.3} performanceMode={true}>
              <div className="bg-[#222222] border border-[#333333] shadow-lg p-8 rounded-2xl max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-2/3">
                    <GradientInput 
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      className="w-full" 
                      icon={<Mail size={20} />}
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <GradientButton 
                    type="submit"
                    size="lg"
                    className="w-full sm:w-1/3 font-semibold rounded-xl h-[48px] flex items-center justify-center bg-gradient-to-r from-[#5A51E1] to-[#6E65E7]"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Joining...' : 'Join Waitlist'}
                  </GradientButton>
                </form>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>
    </main>
  )
} 