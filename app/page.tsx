// Force Vercel update - timestamp: 2025-03-23T05:24:41Z
'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { MessageCircle, Globe2, Brain, Trophy, ChevronRight, Sparkles, Mail } from 'lucide-react'
import { ImageCarousel } from "@/components/ImageCarousel"
import { PhoneMockup } from "@/components/PhoneMockup"
import { HeaderPhoneMockup } from "@/components/HeaderPhoneMockup"
import { GradientButton } from "@/components/ui/GradientButton"
import { useEmailSubmission } from '@/lib/hooks/useEmailSubmission'
import { Toaster } from 'react-hot-toast'
import { FloatingElement } from '@/components/ui/FloatingElement'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { FadeInSection } from '@/components/ui/FadeInSection'
import { ParallaxContainer } from '@/components/ui/ParallaxContainer'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'
import { DynamicBackground } from '@/components/ui/DynamicBackground'
import { AnimatedFeature } from '@/components/ui/AnimatedFeature'
import { GradientInput } from '@/components/ui/GradientInput'

export default function Home() {
  const [email, setEmail] = useState('')
  const { submitEmail, isLoading } = useEmailSubmission()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitEmail(email)
    setEmail('') // Clear the input on success
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  return (
    <main className="min-h-screen bg-[#0a0a10] overflow-x-hidden">
      <Toaster position="top-center" />
      <DynamicBackground 
        particleCount={40}
        enableMeteors={true}
        enableOrbs={true}
        primaryColor="#8A80F9"
        secondaryColor="#5A51E1"
        accentColor="#9F97FF"
        performanceMode={true}
        gridSize={40}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-16 md:pt-safe pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(138,128,249,0.15),transparent_70%)] z-0" />
        
        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Phone Mockup - LEFT SIDE */}
            <div className="order-1 mb-8 md:mb-0 md:order-1 min-h-[600px] relative">
              <div className="flex justify-center mx-auto max-w-sm w-full">
                <div className="relative max-w-[300px] w-full">
                  <div className="absolute -inset-16 bg-gradient-to-r from-[#5A51E1]/5 to-[#8A80F9]/5 rounded-full blur-3xl opacity-50"></div>
                  <div className="relative group z-10 h-full w-full transform-gpu">
                    <HeaderPhoneMockup color="purple" performanceMode={false} slideFrom="left">
                      <div className="relative w-full h-full bg-black rounded-[2.5rem] overflow-hidden">
                        <ImageCarousel 
                          transitionType="fade"
                          interval={5000}
                          performanceMode={true}
                        />
                      </div>
                    </HeaderPhoneMockup>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Text and Form - RIGHT SIDE */}
            <div className="order-2 md:order-2">
              <FadeInSection direction="left" performanceMode={true}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tighter text-center">
                  <span className="gradient-text animate-text-shimmer block">Say Hi To Shira</span>
                  <span className="block mt-2">Turn Endless Scrolling Into Language Learning</span>
                </h1>
                
                <p className="text-gray-300 text-lg mb-8 text-center">
                  Our AI-powered app transforms your daily social media habits into language learning opportunities. Experience immersive learning that adapts to your interests and skill level.
                </p>
                
                <div className="glass-card p-6 rounded-2xl mb-8">
                  <h2 className="text-xl font-bold mb-4 text-center">Join Our Waitlist</h2>
                  
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
                      className="w-full h-14 px-10 text-lg font-bold rounded-xl"
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
      
      {/* Floating Elements */}
      <div className="relative">
        <FloatingElement 
          className="absolute top-40 left-[10%] text-purple-500 opacity-20 hidden lg:block"
          yOffset={20} duration={10}
        >
          <Sparkles className="w-20 h-20 animate-pulse-glow" />
        </FloatingElement>
        
        <FloatingElement 
          className="absolute top-96 right-[10%] text-purple-500 opacity-30 hidden lg:block"
          yOffset={15} duration={8}
        >
          <Sparkles className="w-16 h-16 animate-pulse-glow" />
        </FloatingElement>
      </div>

      {/* Key Benefits Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(138,128,249,0.2),transparent_70%)] z-0" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <FadeInSection direction="up" performanceMode={true}>
              <span className="text-sm font-semibold text-[#8A80F9] mb-2 block uppercase tracking-wide">FEATURES & BENEFITS</span>
              <h2 className="text-4xl md:text-5xl font-bold gradient-text animate-text-shimmer">Key Benefits</h2>
            </FadeInSection>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Features - Left Side */}
            <div>
              <div className="grid sm:grid-cols-2 gap-8">
                <AnimatedFeature
                  icon={<MessageCircle className="w-6 h-6" />}
                  title="Learn through real-life conversations"
                  description="Absorb language naturally with engaging short-form videos"
                  delay={0.2}
                />

                <AnimatedFeature
                  icon={<Globe2 className="w-6 h-6" />}
                  title="Cultural immersion"
                  description="Master idioms, social norms, and expressions used by native speakers"
                  delay={0.3}
                />

                <AnimatedFeature
                  icon={<Brain className="w-6 h-6" />}
                  title="AI-powered feedback"
                  description="Improve pronunciation and fluency with real-time voice analysis"
                  delay={0.4}
                />

                <AnimatedFeature
                  icon={<Trophy className="w-6 h-6" />}
                  title="Personalized progress tracking"
                  description="Stay motivated with streak rewards and adaptive learning"
                  delay={0.5}
                />
              </div>
            </div>

            {/* Phone Mockup - Right Side */}
            <div className="flex justify-center lg:justify-end pt-8 lg:pt-0">
              <div className="relative max-w-[300px] w-full min-h-[600px]">
                <div className="absolute -inset-16 bg-gradient-to-r from-[#5A51E1]/5 to-[#8A80F9]/5 rounded-full blur-3xl opacity-50"></div>
                <div className="relative group z-10 h-full w-full transform-gpu">
                  <PhoneMockup slideFrom="left" color="purple" performanceMode={false}>
                    <div className="relative w-full h-full bg-black rounded-[2.5rem] overflow-hidden">
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
                  </PhoneMockup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 border-t border-[#282828]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(138,128,249,0.15),transparent_70%)] z-0" />
        
        <FloatingElement 
          className="absolute top-0 right-[15%] text-purple-500 opacity-20 hidden lg:block"
          yOffset={20}
          duration={8}
        >
          <Sparkles className="w-16 h-16 animate-pulse-glow" />
        </FloatingElement>
        
        <FloatingElement 
          className="absolute bottom-0 left-[15%] text-purple-500 opacity-15 hidden lg:block"
          yOffset={15}
          duration={10}
        >
          <Sparkles className="w-12 h-12 animate-pulse-glow" />
        </FloatingElement>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <FadeInSection direction="up" performanceMode={true}>
              <span className="text-sm font-semibold text-[#8A80F9] mb-2 block uppercase tracking-wide">GET STARTED</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight neon-text">
                Ready to Transform Your Language Learning?
              </h2>
            </FadeInSection>
            
            <FadeInSection direction="up" delay={0.2} performanceMode={true}>
              <p className="text-xl mb-12 text-gray-300">
                Join our waitlist for exclusive early access and special perks
              </p>
            </FadeInSection>
            
            <FadeInSection direction="up" delay={0.3} performanceMode={true}>
              <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-2/3">
                    <GradientInput 
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      className="w-full"
                      icon={<Mail className="h-5 w-5" />}
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <GradientButton 
                    type="submit"
                    size="lg" 
                    className="w-full sm:w-1/3 h-14 px-10 text-lg font-bold rounded-xl"
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
      </section>
    </main>
  )
} 