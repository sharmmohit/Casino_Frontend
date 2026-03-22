"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { plans } from "@/lib/data"
import { Check } from "lucide-react"

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section id="pricing" className="py-24 md:py-32 bg-gradient-to-b from-black to-gray-900/30">
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
              Pricing
            </span>
            <div className="w-8 h-px bg-white/20" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Simple,
            <br />
            <span className="gradient-text-white">transparent pricing</span>
          </h2>
          <p className="text-sm text-white/40 mt-4">Start free, scale as you grow. No hidden fees.</p>

          {/* Toggle */}
          <div className="inline-flex p-1 rounded-lg border border-white/10 bg-white/5 mt-6">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 rounded-md text-sm transition-all ${
                !isAnnual ? "bg-white text-black font-semibold" : "text-white/40 hover:text-white/70"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-1.5 rounded-md text-sm transition-all flex items-center gap-1 ${
                isAnnual ? "bg-white text-black font-semibold" : "text-white/40 hover:text-white/70"
              }`}
            >
              Annual
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                isAnnual ? "bg-black/20 text-black" : "bg-white/10 text-white/60"
              }`}>
                -20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${
                plan.hi
                  ? "border-white/20 bg-gradient-to-b from-white/10 to-white/5 shadow-2xl scale-[1.02]"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-white text-black text-[10px] font-mono font-semibold">
                  {plan.badge}
                </div>
              )}

              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <p className="text-xs text-white/40 mb-4">{plan.desc}</p>

              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-bold">
                  ${isAnnual ? plan.an : plan.mo}
                </span>
                <span className="text-sm text-white/40 mb-1.5">/mo</span>
              </div>

              {/* Reserve space so layout doesn't shift when toggling */}
              <div className="text-[10px] text-white/40 mb-4 h-4">
                {isAnnual && `Saves $${(plan.mo - plan.an) * 12}/yr billed annually`}
              </div>

              <button
                className={`w-full py-2.5 rounded-lg text-sm font-semibold mb-6 transition-all duration-200 ${
                  plan.hi
                    ? "bg-white text-black hover:bg-white/90 hover:shadow-lg"
                    : "border border-white/20 text-white hover:bg-white/10"
                }`}
              >
                {plan.cta}
              </button>

              <ul className="space-y-2.5">
                {plan.feats.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-xs text-white/60">
                    <Check className="w-3.5 h-3.5 text-white shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[10px] font-mono text-white/30 mt-8">
          14-day free trial · No credit card required
        </p>
      </div>
    </section>
  )
}