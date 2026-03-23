"use client"

import { motion } from "framer-motion"
import { Gamepad2, Dice6, Coins, Trophy, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

const games = [
  {
    id: 1,
    name: "Slots",
    icon: <Gamepad2 className="w-8 h-8" />,
    description: "Hundreds of slot machines with unique themes",
    color: "from-amber-500/20 to-amber-600/10",
    href: "/games/slots"
  },
  {
    id: 2,
    name: "Table Games",
    icon: <Dice6 className="w-8 h-8" />,
    description: "Blackjack, Roulette, Baccarat & more",
    color: "from-blue-500/20 to-blue-600/10",
    href: "/games/table"
  },
  {
    id: 3,
    name: "Live Casino",
    icon: <Trophy className="w-8 h-8" />,
    description: "Real dealers, real-time action",
    color: "from-purple-500/20 to-purple-600/10",
    href: "/games/live"
  },
  {
    id: 4,
    name: "Sportsbook",
    icon: <Sparkles className="w-8 h-8" />,
    description: "Bet on your favorite sports",
    color: "from-green-500/20 to-green-600/10",
    href: "/games/sports"
  }
]

export default function GamesShowcase() {
  return (
    <section id="games" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 mb-4">
            <Coins className="w-3 h-3 text-amber-500" />
            <span className="text-xs text-amber-400/80 font-mono">Game Collection</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            World-Class Gaming
            <span className="block text-amber-400">Experience</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto">
            Choose from hundreds of games powered by leading providers. All games are fair, secure, and optimized for all devices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <Link href={game.href}>
                <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${game.color} p-8 border border-white/10 hover:border-amber-500/50 transition-all duration-300 card-hover`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-amber-400 group-hover:scale-110 transition-transform">
                      {game.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{game.name}</h3>
                    <p className="text-white/40 text-sm mb-4">{game.description}</p>
                    <div className="text-amber-400 text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">
                      Explore Games →
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}