'use client'
import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Globe2, Brain, Trophy, ChevronRight } from 'lucide-react'
import { ImageCarousel } from "@/components/ImageCarousel"
import { PhoneMockup } from "@/components/PhoneMockup"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(200,200,255,0.2),transparent)] z-0" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Say Hi To Shira- Turn Endless Scrolling Into Language Learning
              </h1>
              <h2 className="text-xl text-gray-600 mb-8">
                Learn real-life conversations through bite-sizes videos, interactive exercises, and conversations with AI
              </h2>
            </div>

            <div className="relative">
              <ImageCarousel />
            </div>
          </div>
          
          {/* Move CTA under carousel for mobile */}
          <div className="mt-8 lg:hidden">
            <div className="flex flex-col gap-4 max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input 
                  type="text" 
                  placeholder="First Name"
                  className="w-full h-12 text-lg"
                />
                <Input 
                  type="text" 
                  placeholder="Last Name"
                  className="w-full h-12 text-lg"
                />
              </div>
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="w-full h-12 text-lg"
              />
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg h-12 px-8">
                Join the Community
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <div className="flex flex-col gap-4 max-w-md">
              <div className="flex gap-4">
                <Input 
                  type="text" 
                  placeholder="First Name"
                  className="w-full h-12 text-lg"
                />
                <Input 
                  type="text" 
                  placeholder="Last Name"
                  className="w-full h-12 text-lg"
                />
              </div>
              <div className="flex gap-4">
                <Input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full h-12 text-lg"
                />
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg h-12 px-8">
                  Join the Community
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-12">Key Benefits</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Learn through real-life conversations</h3>
                    <p className="text-gray-600">Absorb language naturally with engaging short-form videos</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Globe2 className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Cultural immersion</h3>
                    <p className="text-gray-600">Master idioms, social norms, and expressions used by native speakers</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">AI-powered feedback</h3>
                    <p className="text-gray-600">Improve pronunciation and fluency with real-time voice analysis</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Personalized progress tracking</h3>
                    <p className="text-gray-600">Stay motivated with streak rewards and adaptive learning</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <PhoneMockup slideFrom="left">
                <Image
                  src="/assets/screenshot1.png"
                  alt="Language selection"
                  fill
                  priority
                  sizes="350px"
                  className="object-contain"
                />
              </PhoneMockup>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your Language Learning?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join our waitlist for exclusive early access and special perks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email"
              className="w-full h-12 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button size="lg" variant="secondary" className="h-12 px-8 text-lg">
              Join the Waitlist
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
} 