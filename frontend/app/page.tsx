"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import TetorisLogo from "@/components/tetris-logo"
import TetrisBackground from "@/components/tetris-background"
import TetorisButton from "@/components/tetris-button"
import { useAuth } from "@/lib/hooks/useAuth"

// TRANG CHU - MENU CHINH CUA GAME
export default function Home() {
  const router = useRouter() // dieu huong trang
  const [showMenu, setShowMenu] = useState(false) // hien thi menu
  const { user, logout, isLoading } = useAuth() // thong tin nguoi dung

  // HIEN THI MENU SAU 1 GIAY CHO ANIMATION
  useEffect(() => {
    const timer = setTimeout(() => setShowMenu(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  // BAT DAU CHOI GAME
  const startGame = () => {
    // cho phep choi ngay khong can dang nhap
    router.push('/game')
  }

  // MO TRANG CAI DAT
  const openSettings = () => {
    router.push('/settings')
  }

  const openLeaderboard = () => {
    router.push('/leaderboard')
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

  // GIAO DIEN TRANG CHU
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* PHAN DANG NHAP/DANG XUAT O GOC TREN PHAI */}
      {showMenu && !isLoading && (
        <div className="absolute top-6 right-6 z-50">
          {user ? (
            // HIEN THI THONG TIN NGUOI DUNG VA NUT DANG XUAT
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 bg-black/80 px-4 py-2 rounded-lg border-2 border-yellow-300"
            >
              <span className="text-yellow-300 font-bold text-sm" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                👋 {user.name}
              </span>
              <button 
                onClick={logout} 
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded border-2 border-black transition-all text-xs"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                LOGOUT
              </button>
            </motion.div>
          ) : (
            // NUT DANG NHAP CHO NGUOI CHUA DANG NHAP
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.button
                onClick={openLogin}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 border-3 border-black px-4 py-2 font-bold text-sm transition-all rounded-lg shadow-lg"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔑 LOGIN
              </motion.button>
            </motion.div>
          )}
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="absolute top-6 right-6 z-50">
          <div className="bg-black/80 px-4 py-2 rounded-lg border-2 border-gray-600">
            <span className="text-gray-400 text-xs" style={{ fontFamily: "'Press Start 2P', monospace" }}>
              Loading...
            </span>
          </div>
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
              <TetorisButton onClick={openLeaderboard} label="RANKING" color="green" />
              <TetorisButton onClick={openSettings} label="SETTINGS" color="pink" />
              <TetorisButton onClick={quitGame} label="QUIT" color="purple" />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}