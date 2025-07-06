"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import TetorisLogo from "@/components/tetris-logo"
import TetrisBackground from "@/components/tetris-background"
import TetorisButton from "@/components/tetris-button"
import { useAuth } from "@/lib/hooks/useAuth"

export default function Home() {
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)
  const { user, logout } = useAuth()

  // Hiển thị menu sau 1 giây
  useEffect(() => {
    const timer = setTimeout(() => setShowMenu(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const startGame = () => {
    // Cho phép chơi game ngay lập tức, không cần đăng nhập
    router.push('/game')
  }

  const openSettings = () => {
    router.push('/settings')
  }

  const quitGame = () => {
    window.close()
    setTimeout(() => {
      window.location.href = "about:blank"
    }, 100)
  }

  const openLogin = () => {
    router.push('/login')
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Login section */}
      {showMenu && (
        <div className="absolute top-6 right-6 z-50">
          {user ? (
            <div className="flex items-center gap-2 bg-black/70 px-3 py-1 rounded">
              <span className="text-yellow-300 font-bold" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                Xin chào, {user.name}
              </span>
              <button onClick={logout} className="text-red-400 underline ml-2" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                LOGOUT
              </button>
            </div>
          ) : (
            <button
              onClick={openLogin}
              className="bg-yellow-300 border-2 border-black px-3 py-1 font-bold text-sm"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              LOGIN
            </button>
          )}
        </div>
      )}

      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>
      <div className="absolute inset-0 overflow-hidden">
        <TetrisBackground />
      </div>

      {/* Main menu */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: showMenu ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {showMenu && (
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.2,
              }}
              className="mb-20"
            >
              <TetorisLogo />
            </motion.div>
            <div className="flex flex-col space-y-6 items-center">
              <TetorisButton onClick={startGame} label="PLAY" color="blue" />
              <TetorisButton onClick={openSettings} label="SETTINGS" color="pink" />
              <TetorisButton onClick={quitGame} label="QUIT" color="purple" />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}