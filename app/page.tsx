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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  return (
    <main className="min-h-screen bg-[#0f0f13] overflow-x-hidden">
      <Toaster position="top-center" />
      <DynamicBackground 
        particleCount={40}
        enableMeteors={false}
        enableOrbs={true}
        primaryColor="#8A80F9"
        secondaryColor="#5A51E1"
        accentColor="#9F97FF"
        performanceMode={true}
      />
      
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen px-4 pt-16 md:pt-safe pb-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(138,128,249,0.15),transparent)] z-0" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Phone mockup - now first */}
            <FadeInSection direction="right" delay={0.4} performanceMode={true}>
              <ParallaxContainer speed={0.2} className="relative max-w-[90vw] mx-auto lg:mx-0">
                <FloatingElement 
                  yOffset={10} 
                  duration={6} 
                  className="group transition-transform duration-300 hover:scale-[1.02]"
                  performanceMode={true}
                >
                  <div className="perspective-1500 relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#8A80F9]/20 to-[#5A51E1]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
                    <PhoneMockup color="purple" performanceMode={true}>
                      <div className="relative w-full h-full bg-black rounded-[2.5rem] overflow-hidden">
                        <ImageCarousel 
                          transitionType="fade"
                          interval={5000}
                          performanceMode={true}
                        />
                      </div>
                    </PhoneMockup>
                  </div>
                </FloatingElement>
              </ParallaxContainer>
            </FadeInSection>

            {/* Text and email - now second */}
            <FadeInSection direction="left" className="space-y-6 pt-6 md:pt-0" performanceMode={true}>
              <AnimatedText 
                text="Say Hi To Shira- Turn Endless Scrolling Into Language Learning"
                className="text-3xl md:text-[48px] font-bold leading-[1.3] tracking-normal"
                highlightWords={["Shira-", "Language", "Learning"]}
                delay={0.2}
              />
              
              <p className="text-gray-300 text-lg leading-relaxed">
                Our AI-powered app transforms your daily social media habits into language learning opportunities. Experience immersive learning that adapts to your interests and skill level.
              </p>
              
              {/* Email signup form */}
              <FadeInSection delay={0.6}>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl relative">
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#8A80F9]/20 via-[#5A51E1]/20 to-[#8A80F9]/20 blur-lg opacity-0 group-hover:opacity-70 transition-all duration-500" />
                  <div className="w-full">
                    <GradientInput
                      type="email"
                      placeholder="Enter your email"
                      name="email" 
                      className="w-full"
                      icon={<Mail size={20} />}
                    />
                    <input 
                      type="hidden" 
                      value={email} 
                      onChange={handleEmailChange} 
                    />
                  </div>
                  <GradientButton 
                    type="submit"
                    size="lg" 
                    className="w-full sm:min-w-[200px] h-14 px-10 text-lg font-bold rounded-xl"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Joining...' : 'Join Waitlist'}
                    {!isLoading && <ChevronRight className="h-5 w-5" />}
                  </GradientButton>
                </form>
              </FadeInSection>
            </FadeInSection>

          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 bg-[#0f0f13] relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(138,128,249,0.12),transparent)] z-0" />
        
        <div className="max-w-6xl mx-auto px-4 px-safe relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <FadeInSection direction="up">
                <span className="text-sm font-semibold text-[#8A80F9] mb-2 block uppercase tracking-wide">FEATURES & BENEFITS</span>
                <h2 className="text-4xl font-bold mb-12 gradient-text animate-text-shimmer">Key Benefits</h2>
              </FadeInSection>
              
              <div className="grid sm:grid-cols-2 gap-6">
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

            <FadeInSection direction="right" delay={0.4} performanceMode={true}>
              <ParallaxContainer speed={0.3} reverse className="relative">
                <FloatingElement 
                  yOffset={15} 
                  duration={7}
                  rotateOffset={2}
                  className="group transition-all duration-300"
                  performanceMode={true}
                >
                  <div className="perspective-1500 relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#5A51E1]/20 to-[#8A80F9]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
                    <PhoneMockup slideFrom="left" color="purple" performanceMode={true}>
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
                </FloatingElement>
              </ParallaxContainer>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#0f0f13] border-t border-[#282828] relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(138,128,249,0.08),transparent)] z-0" />
        
        <FloatingElement 
          className="absolute -top-20 right-10 text-purple-500 opacity-30 hidden md:block"
          yOffset={20}
          duration={8}
        >
          <Sparkles className="w-16 h-16 animate-pulse-glow" />
        </FloatingElement>
        
        <FloatingElement 
          className="absolute bottom-10 left-10 text-purple-500 opacity-20 hidden md:block"
          yOffset={15}
          duration={10}
        >
          <Sparkles className="w-12 h-12 animate-pulse-glow" />
        </FloatingElement>
        
        <div className="max-w-4xl mx-auto px-4 px-safe text-center relative z-10">
          <FadeInSection direction="up">
            <span className="text-sm font-semibold text-[#8A80F9] mb-2 block uppercase tracking-wide">GET STARTED</span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-[1.3] tracking-normal neon-text">
              Ready to Transform Your Language Learning?
            </h2>
            <FadeInSection delay={0.4}>
              <p className="text-xl mb-12 text-gray-300 leading-relaxed">
                Join our waitlist for exclusive early access and special perks
              </p>
            </FadeInSection>
          </FadeInSection>
          
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="w-full sm:w-1/2">
              <GradientInput 
                type="email"
                placeholder="Enter your email"
                name="email"
                className="w-full"
                icon={<Mail className="h-5 w-5" />}
              />
              <input 
                type="hidden" 
                value={email} 
                onChange={handleEmailChange} 
              />
            </div>
            <GradientButton 
              type="submit"
              size="lg" 
              className="w-full sm:w-1/2 h-14 px-10 text-lg font-bold rounded-xl"
              disabled={isLoading}
            >
              {isLoading ? 'Joining...' : 'Join Waitlist'}
              {!isLoading && <ChevronRight className="h-5 w-5" />}
            </GradientButton>
          </form>
        </div>
      </section>
    </main>
  )
} 