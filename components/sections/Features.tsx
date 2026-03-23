"use client"

import { motion } from "framer-motion"
import { Shield, Users, Globe, CreditCard, Zap, BarChart } from "lucide-react"

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Enterprise Security",
    description: "Bank-grade encryption, anti-fraud systems, and fair play certified"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Multitenant Architecture",
    description: "Isolated environments for each tenant with custom branding"
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Reach",
    description: "Multi-currency, multi-language support with local payment methods"
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Payment Integration",
    description: "Seamless deposits/withdrawals with 50+ payment providers"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Real-time Analytics",
    description: "Live dashboard with player behavior and revenue insights"
  },
  {
    icon: <BarChart className="w-6 h-6" />,
    title: "Marketing Tools",
    description: "Built-in CRM, bonuses, promotions, and loyalty programs"
  }
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-black to-black/90">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Enterprise-Grade
            <span className="text-amber-400"> Features</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto">
            Everything you need to launch and scale your online casino platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 card-hover"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mb-6 text-amber-400">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/40">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}