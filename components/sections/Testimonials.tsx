"use client"

import { motion } from "framer-motion"
import { testimonials } from "@/lib/data"

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32">
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
              Testimonials
            </span>
            <div className="w-8 h-px bg-white/20" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Loved by
            <br />
            <span className="gradient-text-white">businesses</span>
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl border border-white/10 bg-white/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < testimonial.stars ? 'text-white' : 'text-white/20'}>
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-white/60 italic mb-4 leading-relaxed">
                {testimonial.text}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium">{testimonial.name}</div>
                  <div className="text-[10px] font-mono text-white/40">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}