'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { MessageCircle, Globe2, Brain, Trophy, ChevronRight, Sparkles, Mail } from 'lucide-react'
import { ImageCarousel } from "@/components/ImageCarousel"
import { PhoneMockup } from "@/components/PhoneMockup"
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

  return (
    <main className="min-h-screen bg-[#181818] overflow-x-hidden">
      <Toaster position="top-center" />
      <DynamicBackground />
      
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen px-4 pt-16 md:pt-safe pb-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(138,128,249,0.1),transparent)] z-0" />
        <div className="absolute inset-0 mesh-grid opacity-30 z-0" />
        
        <div className="relative z-10 max-w-[95vw] mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <FadeInSection direction="up" className="space-y-6 pt-6 md:pt-0">
              <AnimatedText 
                text="Say Hi To Shira- Turn Endless Scrolling Into Language Learning"
                className="text-3xl md:text-[48px] font-bold leading-[1.2]"
                highlightWords={["Shira-", "Language", "Learning"]}
                delay={0.2}
              />
              
              <FadeInSection delay={0.4}>
                <h2 className="text-lg text-[#CFCFCF] mb-6">
                  Learn real-life conversations through bite-sizes videos, interactive exercises, and conversations with AI
                </h2>
              </FadeInSection>
              
              {/* Email signup form */}
              <FadeInSection delay={0.6}>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl">
                  <GradientInput
                    type="email"
                    placeholder="Enter your email"
                    aria-label="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    icon={<Mail size={20} />}
                    containerClassName="w-full"
                  />
                  <GradientButton 
                    type="submit"
                    size="lg" 
                    className="w-full sm:min-w-[200px] h-14 px-10 text-lg font-bold rounded-xl"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Joining...' : 'Join the Waitlist'}
                    {!isLoading && <ChevronRight className="h-5 w-5" />}
                  </GradientButton>
                </form>
              </FadeInSection>
            </FadeInSection>

            <FadeInSection direction="left" delay={0.4}>
              <ParallaxContainer speed={0.2} className="relative max-w-[90vw] mx-auto lg:mx-0">
                <FloatingElement 
                  yOffset={10} 
                  duration={6} 
                  className="group transition-transform duration-300 hover:scale-[1.02]"
                >
                  <PhoneMockup color="purple">
                    <div className="relative w-full h-full bg-black rounded-[2.5rem] overflow-hidden">
                      <ImageCarousel 
                        transitionType="zoom"
                        interval={5000}
                      />
                    </div>
                  </PhoneMockup>
                </FloatingElement>
              </ParallaxContainer>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 bg-[#181818] relative">
        <div className="absolute inset-0 mesh-grid opacity-20 z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(138,128,249,0.08),transparent)] z-0" />
        
        <div className="max-w-[90vw] mx-auto px-4 px-safe relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeInSection direction="up">
                <span className="text-sm font-semibold text-[#CFCFCF] mb-2 block">FEATURES & BENEFITS</span>
                <AnimatedText 
                  text="Key Benefits"
                  className="text-3xl font-bold mb-12 text-white"
                  delay={0.2}
                />
              </FadeInSection>
              
              <div className="space-y-4">
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

            <FadeInSection direction="right" delay={0.4}>
              <ParallaxContainer speed={0.3} reverse className="relative">
                <FloatingElement 
                  yOffset={15} 
                  duration={7}
                  rotateOffset={2}
                >
                  <PhoneMockup slideFrom="left" color="purple">
                    <div className="relative w-full h-full bg-black rounded-[2.5rem] overflow-hidden">
                      <Image
                        src="/assets/screenshot7.png"
                        alt="App feature showcase"
                        fill
                        priority
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </PhoneMockup>
                </FloatingElement>
              </ParallaxContainer>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#181818] border-t border-[#282828] relative">
        <div className="absolute inset-0 mesh-grid opacity-10 z-0" />
        
        <FloatingElement 
          className="absolute -top-20 right-10 text-purple-500 opacity-30 hidden md:block"
          yOffset={20}
          xOffset={10}
          rotateOffset={10}
          duration={8}
        >
          <Sparkles className="w-16 h-16" />
        </FloatingElement>
        
        <FloatingElement 
          className="absolute bottom-10 left-10 text-purple-500 opacity-20 hidden md:block"
          yOffset={15}
          xOffset={15}
          rotateOffset={-5}
          duration={7}
        >
          <Sparkles className="w-12 h-12" />
        </FloatingElement>
        
        <div className="max-w-4xl mx-auto px-4 px-safe text-center">
          <FadeInSection direction="up">
            <span className="text-sm font-semibold text-[#CFCFCF] mb-2 block">GET STARTED</span>
            <AnimatedText 
              text="Ready to Transform Your Language Learning?"
              className="text-3xl lg:text-4xl font-bold mb-6"
              delay={0.2}
            />
            <FadeInSection delay={0.4}>
              <p className="text-xl mb-12 text-[#CFCFCF]">
                Join our waitlist for exclusive early access and special perks
              </p>
            </FadeInSection>
          </FadeInSection>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <GradientInput
              type="email"
              placeholder="Enter your email"
              aria-label="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              icon={<Mail size={20} />}
              containerClassName="w-full"
            />
            <GradientButton 
              type="submit"
              size="lg" 
              className="w-full sm:min-w-[200px] h-14 px-10 text-lg font-bold rounded-xl"
              disabled={isLoading}
            >
              {isLoading ? 'Joining...' : 'Join the Waitlist'}
              {!isLoading && <ChevronRight className="h-5 w-5" />}
            </GradientButton>
          </form>
        </div>
      </section>
    </main>
  )
} 