"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import TetorisLogo from "@/components/tetris-logo"
import TetrisBackground from "@/components/tetris-background"
import TetorisButton from "@/components/tetris-button"
import { useAuth } from "@/lib/hooks/useAuth"

export default function LoginPage() {// trang dang nhap
  const router = useRouter()
  const [inputName, setInputName] = useState("")
  const [inputPassword, setInputPassword] = useState("")
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const { login } = useAuth()

  const handleLogin = async () => {// xu ly dang nhap
    if (inputName.trim()) {
      setIsLoggingIn(true)
      
      // loading time
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      login(inputName.trim(), inputPassword)
      setLoginSuccess(true)
      
      // hien thi thong bao thanh cong
      setTimeout(() => {
        router.push('/') 
      }, 1500)
    }
  }

  const backToHome = () => {// quay ve home sau login
    router.push('/')
  }

  // CHUYEN SANG TRANG DANG KY
  const goToRegister = () => {
    router.push('/register')
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
          className="relative w-[380px] p-8 border-4 border-black bg-gradient-to-b from-gray-900 to-black shadow-2xl flex flex-col gap-6 items-center rounded-lg"
          style={{ 
            fontFamily: "'Press Start 2P', monospace",
            boxShadow: "0 0 20px rgba(255, 255, 0, 0.3)"
          }}
        >
          {loginSuccess ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center"
            >
              <div className="text-3xl mb-4">✅</div>
              <div className="text-xl font-bold text-green-400 mb-2 tracking-wider">LOGIN SUCCESS!</div>
              <div className="text-sm text-gray-300">Redirecting to home...</div>
            </motion.div>
          ) : (
            <>
              <div className="text-2xl font-bold text-yellow-300 mb-2 tracking-wider">LOGIN</div>
              
              <div className="w-full">
                <label className="text-white text-sm w-full text-left mb-2 block">Username</label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-600 bg-gray-800 text-yellow-200 text-base outline-none focus:border-yellow-400 focus:bg-gray-700 transition-all rounded"
                  value={inputName}
                  onChange={e => setInputName(e.target.value)}
                  autoFocus
                  placeholder="Enter your username"
                  maxLength={20}
                  disabled={isLoggingIn}
                  onKeyPress={(e) => e.key === 'Enter' && !isLoggingIn && handleLogin()}
                />
              </div>
              
              <div className="w-full">
                <label className="text-white text-sm w-full text-left mb-2 block">Password</label>
                <input
                  className="w-full px-4 py-3 border-2 border-gray-600 bg-gray-800 text-yellow-200 text-base outline-none focus:border-yellow-400 focus:bg-gray-700 transition-all rounded"
                  type="password"
                  value={inputPassword}
                  onChange={e => setInputPassword(e.target.value)}
                  placeholder="Enter password (optional)"
                  maxLength={30}
                  disabled={isLoggingIn}
                  onKeyPress={(e) => e.key === 'Enter' && !isLoggingIn && handleLogin()}
                />
              </div>
              
              <motion.button
                className="w-full py-4 mt-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold border-4 border-black transition-all text-base rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleLogin}
                disabled={isLoggingIn || !inputName.trim()}
                whileHover={!isLoggingIn ? { scale: 1.02 } : {}}
                whileTap={!isLoggingIn ? { scale: 0.98 } : {}}
              >
                {isLoggingIn ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    LOGGING IN...
                  </div>
                ) : (
                  "LOGIN"
                )}
              </motion.button>

              <motion.button
                className="w-full py-3 mt-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold border-4 border-black transition-all text-sm rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={goToRegister}
                disabled={isLoggingIn}
                whileHover={!isLoggingIn ? { scale: 1.02 } : {}}
                whileTap={!isLoggingIn ? { scale: 0.98 } : {}}
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                NO ACCOUNT? REGISTER
              </motion.button>
            </>
          )}
        </motion.div>

        {/* Back button */}
        {!isLoggingIn && !loginSuccess && (
          <div className="mt-8">
            <TetorisButton onClick={backToHome} label="BACK TO MENU" color="purple" />
          </div>
        )}
      </div>
    </div>
  )
}
