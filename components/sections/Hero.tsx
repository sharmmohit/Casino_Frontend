"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/Button"
import Link from "next/link"

const words = ['Voice Agents', 'Calling Agents', 'Restaurant Bots', 'Appointment AI', 'Support Agents', 'Sales Agents']

export default function Hero() {
  const [typedWord, setTypedWord] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]
    
    if (!deleting && charIndex < currentWord.length) {
      const timeout = setTimeout(() => {
        setTypedWord(currentWord.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, 85)
      return () => clearTimeout(timeout)
    } else if (deleting && charIndex > 0) {
      const timeout = setTimeout(() => {
        setTypedWord(currentWord.slice(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      }, 40)
      return () => clearTimeout(timeout)
    } else if (!deleting && charIndex === currentWord.length) {
      setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && charIndex === 0) {
      setDeleting(false)
      setWordIndex((wordIndex + 1) % words.length)
    }
  }, [charIndex, deleting, wordIndex])

  const stats = [
    { value: "2,400+", label: "Active Agents" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "<200ms", label: "Response Time" },
    { value: "150+", label: "Integrations" },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-gray-900/50" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_black_100%)]" />
      
      {/* Animated Orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-white/10 to-white/5 blur-3xl"
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-xs text-white/60 font-mono">The AI Agent Marketplace</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1]">
            Deploy Your
            <br />
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {typedWord}
            </span>
            <span className="inline-block w-[2px] h-[0.85em] bg-white ml-1 animate-pulse" />
            <br />
            <span className="text-white/40">In Minutes</span>
          </h1>

          {/* Description */}
          <p className="text-lg text-white/40 max-w-2xl mx-auto mb-10">
            AgentsDesk is the all-in-one marketplace to discover, purchase, and deploy AI agents. 
            From restaurant reservations to cold calling — launch intelligence into your business instantly.
          </p>

          {/* CTA Buttons */}
         // Update the CTA buttons section
<div className="flex flex-col sm:flex-row gap-4 justify-center">
  <Link href="/register">
    <Button size="lg" className="group">
      Browse Agents
      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </Button>
  </Link>
  <Link href="/register">
    <Button size="lg" variant="outline">
      <Play className="mr-2 w-4 h-4" />
      See how it works
    </Button>
  </Link>
</div>
              

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-white/40 font-mono">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] font-mono text-white/40">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  )
}