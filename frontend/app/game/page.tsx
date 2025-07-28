"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import TetrisGame from "@/components/tetris-game"
import { useAuth } from "@/lib/hooks/useAuth"

export default function GamePage() {
  const router = useRouter() // dieu huong
  const { user, isLoading } = useAuth() // xu ly va lay thong tin nguoi dung

  const returnToMenu = () => { // quay ve trang chu
    router.push('/')
  }

  const goToLeaderboard = () => { // chuyen den bang xep hang
    router.push('/leaderboard')
  }

  const goToLogin = () => { // chuyen den trang dang nhap
    router.push('/login')
  }

  // choi game khong co user dang nhap

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* hien thi thong tin dang nhap */}
      {user && !isLoading && (
        <div className="absolute top-6 right-6 z-50">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-black/80 px-3 py-2 rounded-lg border-2 border-yellow-300"
          >
            <span className="text-yellow-300 font-bold text-sm" style={{ fontFamily: "'Press Start 2P', monospace" }}>
              🎮 {user.name}
            </span>
          </motion.div>
        </div>
      )}

      {/* background */}
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>

      {/* game */}
      <TetrisGame onReturn={returnToMenu} onLeaderboard={goToLeaderboard} onLogin={goToLogin} />
    </div>
  )
}
