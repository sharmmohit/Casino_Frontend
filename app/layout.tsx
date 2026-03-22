import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { AuthProvider } from '@/lib/auth-context'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'AI Agents Desk - Next Generation AI Agents Marketplace',
  description: 'Deploy and scale AI voice agents, calling agents, and specialized AI assistants for your business',
  keywords: 'AI agents, voice AI, calling agents, restaurant AI, appointment AI, AI marketplace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <AuthProvider>
          <div className="scanline" />
          <Navbar />
          <main className="relative">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}