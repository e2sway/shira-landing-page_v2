import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

// Configure Inter font
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shira - Short Form Language Learning',
  description: 'Learn languages through bite-sized videos and AI conversations',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Enable safe area support for mobile devices */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={`${inter.className} bg-[#181818] text-white antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
