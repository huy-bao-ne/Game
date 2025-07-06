"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import TetorisLogo from "@/components/tetris-logo"
import TetrisBackground from "@/components/tetris-background"
import TetorisButton from "@/components/tetris-button"
import { useAuth } from "@/lib/hooks/useAuth"

export default function LoginPage() {// Trang dang nhap
  const router = useRouter()
  const [inputName, setInputName] = useState("")
  const [inputPassword, setInputPassword] = useState("")
  const { login } = useAuth()

  const handleLogin = () => {// xu ly dang nhap
    if (inputName.trim()) {
      login(inputName.trim())
      router.push('/') 
    }
  }

  const backToHome = () => {// quay ve home sau login
    router.push('/')
  }

  return (// Trang dang nhap
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>
      <div className="absolute inset-0 overflow-hidden">
        <TetrisBackground />
      </div>

      {/* Login content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        {/* Logo */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.2,
          }}
          className="mb-12"
        >
          <TetorisLogo />
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative w-[340px] p-8 border-4 border-black bg-[#222b3a] shadow-2xl flex flex-col gap-6 items-center"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          <div className="text-2xl font-bold text-yellow-300 mb-2 tracking-wider">LOGIN</div>
          
          <label className="text-white text-sm w-full text-left mb-1">User Name</label>
          <input
            className="w-full px-3 py-2 border-2 border-black bg-[#111] text-yellow-200 text-lg outline-none focus:border-yellow-400 transition"
            value={inputName}
            onChange={e => setInputName(e.target.value)}
            autoFocus
            placeholder="your name"
            maxLength={30}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
          
          <label className="text-white text-sm w-full text-left mb-1 mt-2">Password</label>
          <input
            className="w-full px-3 py-2 border-2 border-black bg-[#111] text-yellow-200 text-lg outline-none focus:border-yellow-400 transition"
            type="password"
            value={inputPassword}
            onChange={e => setInputPassword(e.target.value)}
            placeholder="your password"
            maxLength={30}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
          
          <button
            className="w-full py-3 mt-2 bg-blue-400 text-white font-bold border-4 border-black hover:brightness-110 transition-all text-lg"
            onClick={handleLogin}
          >
            Login
          </button>
        </motion.div>

        {/* Back button */}
        <div className="mt-8">
          <TetorisButton onClick={backToHome} label="BACK TO MENU" color="purple" />
        </div>
      </div>
    </div>
  )
}
