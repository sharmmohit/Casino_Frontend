"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, Github, Chrome } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    try {
      await login(email, password)
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen bg-black flex overflow-hidden">
      {/* Left Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 relative z-10">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_black_100%)]" />
        </div>

        <div className="relative z-10 max-w-md w-full mx-auto lg:mx-0">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2.5 mb-12 group">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 bg-white rounded-xl opacity-20 group-hover:opacity-40 transition-opacity blur-sm" />
              <div className="relative w-9 h-9 bg-gradient-to-br from-white to-gray-400 rounded-xl flex items-center justify-center">
                <span className="text-black font-mono font-bold text-xs">AD</span>
              </div>
            </div>
            <span className="font-bold text-xl text-white tracking-tight">
              Agents<span className="text-white/60">Desk</span>
            </span>
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-mono text-white/60 tracking-widest uppercase">
                Welcome back
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
              Sign in to your
              <br />
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                AI agents dashboard
              </span>
            </h1>
            <p className="text-sm text-white/40 mt-2 mb-8">
              Enter your credentials to access your agents and analytics.
            </p>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-white/40 mb-2 tracking-wide">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-white/40 mb-2 tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-3 h-3 rounded border-white/20 bg-white/5" />
                <span className="text-xs text-white/40">Remember me</span>
              </label>
              <a href="#" className="text-xs text-white/60 hover:text-white transition-colors">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-black text-white/40">or</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full gap-3"
            >
              <Chrome className="w-4 h-4" />
              Continue with Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full gap-3"
            >
              <Github className="w-4 h-4" />
              Continue with GitHub
            </Button>
          </form>

          <div className="mt-6">
            <p className="text-xs text-white/40 text-center">
              Don't have an account?{" "}
              <Link href="/register" className="text-white hover:text-white/80 transition-colors">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,_transparent,_black)]" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-6 max-w-md">
            {[
              { value: "2,400+", label: "Active Agents" },
              { value: "1.2M+", label: "Calls Handled" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "<100ms", label: "Response Time" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-center"
              >
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/40 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-12 left-0 right-0 text-center px-12">
          <p className="text-white/40 text-sm leading-relaxed italic">
            "Join 12,000+ businesses already<br />
            <span className="text-white not-italic font-medium">scaling with AI agents."</span>
          </p>
        </div>
      </div>
    </div>
  )
}