"use client"

import { useEffect } from 'react'
import Hero from '@/components/sections/Hero'
import AgentsShowcase from '@/components/sections/AgentsShowcase'
import UseCases from '@/components/sections/UseCases'
import Pricing from '@/components/sections/Pricing'
import Testimonials from '@/components/sections/Testimonials'
import CTA from '@/components/sections/CTA'

export default function Home() {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')
      if (anchor?.hash && anchor.hash.startsWith('#')) {
        e.preventDefault()
        const element = document.querySelector(anchor.hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  return (
    <>
      <Hero />
      <AgentsShowcase />
      <UseCases />
      <Pricing />
      <Testimonials />
      <CTA />
    </>
  )
}