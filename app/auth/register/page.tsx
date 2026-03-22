"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, User, Lock, Github, Chrome } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"

export default function RegisterPage() {
  const router = useRouter()
  const { register, isLoading } = useAuth()
  const [step, setStep] = useState<"email" | "details">("email")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const getPasswordStrength = (pass: string) => {
    let strength = 0
    if (pass.length >= 8) strength++
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++
    if (pass.match(/\d/)) strength++
    if (pass.match(/[^a-zA-Z\d]/)) strength++
    return strength
  }

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }
    setError("")
    setStep("details")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }
    
    try {
      await register(email, password, name)
      router.push("/dashboard")
    } catch (err) {
      setError("Registration failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-black flex overflow-hidden">
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 relative z-10">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_black_100%)]" />
        </div>

        <div className="relative z-10 max-w-md w-full mx-auto lg:mx-0">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-mono text-white/60 tracking-widest uppercase">
                Create Account
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
              Start deploying
              <br />
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                AI agents today
              </span>
            </h1>
            <p className="text-sm text-white/40 mt-2 mb-8">
              {step === "email"
                ? "Enter your email to get started. No credit card required."
                : "Almost there! Fill in your details to create your account."}
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

          {step === "email" && (
            <motion.form
              key="email-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleContinue}
              className="space-y-4"
            >
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

              <Button type="submit" className="w-full" size="lg">
                Continue
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-black text-white/40">or</span>
                </div>
              </div>

              <Button variant="outline" className="w-full gap-3">
                <Chrome className="w-4 h-4" />
                Continue with Google
              </Button>

              <Button variant="outline" className="w-full gap-3">
                <Github className="w-4 h-4" />
                Continue with GitHub
              </Button>
            </motion.form>
          )}

          {step === "details" && (
            <motion.form
              key="details-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/20 w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <span className="text-xs font-mono text-white/80">{email}</span>
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="text-white/40 hover:text-white/80 text-xs ml-1 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/40 mb-2 tracking-wide">
                  Full name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
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
                    placeholder="Min. 8 characters"
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

                {password.length > 0 && (
                  <div className="mt-2 space-y-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => {
                        const strength = getPasswordStrength(password)
                        return (
                          <div
                            key={i}
                            className="flex-1 h-0.5 rounded-full transition-all duration-300"
                            style={{
                              background: i <= strength
                                ? strength === 1 ? "#ef4444"
                                : strength === 2 ? "#f97316"
                                : strength === 3 ? "#eab308"
                                : "#ffffff"
                                : "rgba(255,255,255,0.1)"
                            }}
                          />
                        )
                      })}
                    </div>
                    <p className="text-[10px] text-white/40">
                      {getPasswordStrength(password) === 0 && "Use at least 8 characters"}
                      {getPasswordStrength(password) === 1 && "Weak password"}
                      {getPasswordStrength(password) === 2 && "Fair password"}
                      {getPasswordStrength(password) === 3 && "Good password"}
                      {getPasswordStrength(password) === 4 && "Strong password"}
                    </p>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </motion.form>
          )}

          <div className="mt-6">
            <p className="text-xs text-white/40 text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-white hover:text-white/80 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,_transparent,_black)]" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-80">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 rounded-2xl p-5 border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center text-xl">
                  🎙️
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Aria Voice</div>
                  <div className="text-[10px] text-white/40 font-mono">Voice Agent</div>
                </div>
                <div className="ml-auto">
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 border border-white/20">
                    <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
                    <span className="text-[9px] font-mono text-white/80">Live</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-0.5 h-8 mb-4">
                {Array.from({ length: 32 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-full bg-white"
                    animate={{
                      height: [20, 40, 20],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.03,
                    }}
                    style={{
                      height: `${20 + Math.sin(i * 0.8) * 14}%`,
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
                <span>Processing call...</span>
                <span className="text-white">02:34</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -left-16 top-1/2 -translate-y-1/2 rounded-xl p-3 border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <div className="text-lg font-bold text-white">12k+</div>
              <div className="text-[9px] text-white/40 font-mono">Calls/month</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -right-12 -top-8 rounded-xl p-3 border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <div className="text-lg font-bold text-white">98%</div>
              <div className="text-[9px] text-white/40 font-mono">Uptime</div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-12 left-0 right-0 text-center px-12">
          <p className="text-white/40 text-sm leading-relaxed italic">
            "Deploy AI agents in minutes,<br />
            <span className="text-white not-italic font-medium">not months."</span>
          </p>
        </div>
      </div>
    </div>
  )
}