"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"

export default function CTA() {
  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-linear-to-r from-white/5 via-transparent to-white/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-white/5 blur-[100px]" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Ready to deploy your
            <br />
            <span className="gradient-text-white">first AI agent?</span>
          </h2>
          <p className="text-sm text-white/40 max-w-md mx-auto mb-8">
            Join 12,000+ businesses already running AI agents on AgentsDesk. Start free, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button>
              Start For Free
            </Button>
            <Button>
              Talk to Sales
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}