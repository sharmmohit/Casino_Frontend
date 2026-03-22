"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useCases } from "@/lib/data"

export default function UseCases() {
  const [activeCase, setActiveCase] = useState(useCases[0])

  return (
    <section id="usecases" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-px bg-white/20" />
            <span className="text-xs font-mono text-white/40 uppercase tracking-wider">
              Use Cases
            </span>
            <div className="w-8 h-px bg-white/20" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Built for every
            <br />
            <span className="gradient-text-white">industry</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {useCases.map((uc) => (
            <button
              key={uc.id}
              onClick={() => setActiveCase(uc)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                activeCase.id === uc.id
                  ? 'bg-white text-black'
                  : 'border border-white/10 text-white/40 hover:text-white/60'
              }`}
            >
              {uc.icon} {uc.label}
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <motion.div
          key={activeCase.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Left Column */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{activeCase.headline}</h3>
            <p className="text-sm text-white/40 leading-relaxed mb-6">{activeCase.desc}</p>
            
            {/* Metrics */}
            <div className="flex gap-8 mb-8">
              <div>
                <div className="text-3xl font-bold text-white mb-1">{activeCase.m1}</div>
                <div className="text-[10px] font-mono text-white/40">{activeCase.ml1}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">{activeCase.m2}</div>
                <div className="text-[10px] font-mono text-white/40">{activeCase.ml2}</div>
              </div>
            </div>

            <button className="px-5 py-2.5 bg-white text-black rounded-lg text-sm font-medium hover:bg-white/90 transition-all">
              Get {activeCase.label} Agent
            </button>
          </div>

          {/* Right Column - Feature Card */}
          <div className="p-6 rounded-xl border border-white/10 bg-white/5">
            <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-3xl mb-4">
              {activeCase.icon}
            </div>
            <h4 className="text-lg font-semibold mb-4">{activeCase.label} Agent Features</h4>
            <ul className="space-y-3 mb-6">
              {activeCase.feats.map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-sm text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  {feat}
                </li>
              ))}
            </ul>

            {/* Chat Preview */}
            <div className="mt-6 p-4 rounded-lg bg-black/30 border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] font-mono text-white/40">Agent Live Preview</span>
              </div>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">
                    {activeCase.icon}
                  </div>
                  <div className="flex-1 p-2 rounded-lg bg-white/5 text-xs text-white/60">
                    Hi! I'm your {activeCase.label} AI. How can I help you today?
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <div className="max-w-[70%] p-2 rounded-lg bg-white/10 text-xs text-white">
                    I need to book an appointment for Friday 3pm.
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">
                    {activeCase.icon}
                  </div>
                  <div className="flex-1 p-2 rounded-lg bg-white/5 text-xs text-white/60">
                    Friday 3pm works perfectly! Let me confirm that...
                    <span className="inline-block w-1 h-3 bg-white ml-1 animate-blink" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}