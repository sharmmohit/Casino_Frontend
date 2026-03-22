"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"
import { agents } from "@/lib/data"

const categories = ['All', ...new Set(agents.map(agent => agent.cat))]

export default function AgentsShowcase() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null)

  const filteredAgents = activeCategory === 'All' 
    ? agents 
    : agents.filter(agent => agent.cat === activeCategory)

  return (
    <section id="agents" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-white/40 uppercase tracking-wider">
                  Marketplace
                </span>
                <div className="w-8 h-px bg-white/20" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Browse AI
                <br />
                <span className="gradient-text-white">Agents</span>
              </h2>
            </div>
            <p className="text-sm text-white/40 max-w-xs">
              Pre-built agents ready to deploy. Customize to fit your workflow in minutes.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                  activeCategory === cat
                    ? 'bg-white text-black'
                    : 'border border-white/10 text-white/40 hover:text-white/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAgents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredAgent(agent.id)}
              onMouseLeave={() => setHoveredAgent(null)}
              className="relative group"
            >
              <div className="p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {agent.icon}
                  </div>
                  <div className="text-right">
                    {agent.badge && (
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white/60 mb-1">
                        {agent.badge}
                      </span>
                    )}
                    <div className="text-[10px] font-mono text-white/40">{agent.cat}</div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-1">{agent.name}</h3>
                <p className="text-xs text-white/40 mb-3">{agent.desc}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {agent.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full text-[9px] font-mono border border-white/10 text-white/40">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <div>
                    <div className="flex items-center gap-1 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(agent.rating) ? 'text-white' : 'text-white/20'}>
                          ★
                        </span>
                      ))}
                      <span className="text-[10px] text-white/40 ml-1">{agent.rating}</span>
                    </div>
                    <div className="text-[9px] font-mono text-white/40 mt-0.5">{agent.calls} calls/mo</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{agent.price}</div>
                    <button className="text-[10px] font-mono text-white/60 hover:text-white transition-colors mt-0.5">
                      Deploy Now →
                    </button>
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <AnimatePresence>
                {hoveredAgent === agent.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute -top-2 -right-2"
                  >
                    <div className="bg-white rounded-full p-1.5">
                      <Sparkles className="w-3 h-3 text-black" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Custom Agent CTA */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 text-sm text-white/60 hover:text-white hover:border-white/30 transition-all"
          >
            Request a Custom Agent
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}