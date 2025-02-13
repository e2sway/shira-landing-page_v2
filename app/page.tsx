'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { MessageCircle, Globe2, Brain, Trophy, ChevronRight } from 'lucide-react'
import { ImageCarousel } from "@/components/ImageCarousel"
import { PhoneMockup } from "@/components/PhoneMockup"
import { GradientButton } from "@/components/ui/GradientButton"
import { useEmailSubmission } from '@/lib/hooks/useEmailSubmission'
import { Toaster } from 'react-hot-toast'

export default function Home() {
  const [email, setEmail] = useState('')
  const { submitEmail, isLoading } = useEmailSubmission()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitEmail(email)
    setEmail('') // Clear the input on success
  }

  return (
    <main className="min-h-screen bg-[#181818]">
      <Toaster position="top-center" />
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen px-4 pt-safe pb-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(138,128,249,0.1),transparent)] z-0" />
        
        <div className="relative z-10 max-w-[95vw] mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-[48px] font-bold leading-[1.2] mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#8A80F9] to-[#5A51E1]">
                Say Hi To Shira- Turn Endless Scrolling Into Language Learning
              </h1>
              <h2 className="text-lg text-[#CFCFCF] mb-6">
                Learn real-life conversations through bite-sizes videos, interactive exercises, and conversations with AI
              </h2>
              
              {/* Email signup form */}
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl">
                <Input 
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 text-lg bg-[#282828] border-none rounded-xl px-6 text-white placeholder:text-[#CFCFCF] focus:ring-2 focus:ring-[#8A80F9] shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                  disabled={isLoading}
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

            <div className="relative max-w-[90vw] mx-auto lg:mx-0">
              <div className="group transition-transform duration-300 hover:scale-[1.02]">
                <PhoneMockup>
                  <div className="relative w-full h-full bg-black rounded-[2.5rem] overflow-hidden">
                    <ImageCarousel />
                  </div>
                </PhoneMockup>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 bg-[#181818]">
        <div className="max-w-[90vw] mx-auto px-4 px-safe">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold text-[#CFCFCF] mb-2 block">FEATURES & BENEFITS</span>
              <h2 className="text-3xl font-bold mb-12 text-white">Key Benefits</h2>
              <div className="space-y-4">
                <div className="flex gap-5 p-5 rounded-xl bg-[#282828] hover:bg-[#2d2d2d] transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[rgba(138,128,249,0.1)] flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-[#8A80F9]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">Learn through real-life conversations</h3>
                    <p className="text-[#CFCFCF]">Absorb language naturally with engaging short-form videos</p>
                  </div>
                </div>

                <div className="flex gap-5 p-5 rounded-xl bg-[#282828] hover:bg-[#2d2d2d] transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[rgba(138,128,249,0.1)] flex items-center justify-center">
                    <Globe2 className="w-8 h-8 text-[#8A80F9]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">Cultural immersion</h3>
                    <p className="text-[#CFCFCF]">Master idioms, social norms, and expressions used by native speakers</p>
                  </div>
                </div>

                <div className="flex gap-5 p-5 rounded-xl bg-[#282828] hover:bg-[#2d2d2d] transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[rgba(138,128,249,0.1)] flex items-center justify-center">
                    <Brain className="w-8 h-8 text-[#8A80F9]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">AI-powered feedback</h3>
                    <p className="text-[#CFCFCF]">Improve pronunciation and fluency with real-time voice analysis</p>
                  </div>
                </div>

                <div className="flex gap-5 p-5 rounded-xl bg-[#282828] hover:bg-[#2d2d2d] transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[rgba(138,128,249,0.1)] flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-[#8A80F9]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">Personalized progress tracking</h3>
                    <p className="text-[#CFCFCF]">Stay motivated with streak rewards and adaptive learning</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <PhoneMockup slideFrom="left">
                <div className="relative w-full h-full bg-black rounded-[2.5rem] overflow-hidden">
                  <Image
                    src="/assets/screenshot6.png"
                    alt="App feature showcase"
                    fill
                    priority
                    sizes="350px"
                    className="object-contain"
                  />
                </div>
              </PhoneMockup>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#181818] border-t border-[#282828]">
        <div className="max-w-4xl mx-auto px-4 px-safe text-center">
          <span className="text-sm font-semibold text-[#CFCFCF] mb-2 block">GET STARTED</span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#8A80F9] to-[#5A51E1]">
            Ready to Transform Your Language Learning?
          </h2>
          <p className="text-xl mb-12 text-[#CFCFCF]">
            Join our waitlist for exclusive early access and special perks
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 text-lg bg-[#282828] border-none rounded-xl px-6 text-white placeholder:text-[#CFCFCF] focus:ring-2 focus:ring-[#8A80F9] shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
              disabled={isLoading}
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