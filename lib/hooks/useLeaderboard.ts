import { useState, useEffect } from "react"

export interface LeaderboardEntry {
  rank: number
  name: string
  score: number
}

// Key cho localStorage
const LEADERBOARD_STORAGE_KEY = "tetris_leaderboard"

// Default leaderboard data
const defaultLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "TETRIS_KING", score: 125000 },
  { rank: 2, name: "BLOCK_HERO", score: 98500 },
  { rank: 3, name: "LINE_CLEAR", score: 87300 },
  { rank: 4, name: "PUZZLE_PRO", score: 76200 },
  { rank: 5, name: "COMBO_KING", score: 65100 },
  { rank: 6, name: "SPEED_DEMON", score: 54800 },
  { rank: 7, name: "TETRIS_FAN", score: 43700 },
  { rank: 8, name: "BRICK_MASTER", score: 32600 },
  { rank: 9, name: "GAME_LOVER", score: 21500 }
  // Removed rank 10 so any score > 0 can enter
]

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load leaderboard từ localStorage khi component mount
  useEffect(() => {
    const loadLeaderboard = () => {
      try {
        const saved = localStorage.getItem(LEADERBOARD_STORAGE_KEY)
        if (saved) {
          const parsedData = JSON.parse(saved)
          setLeaderboard(parsedData)
        } else {
          // Nếu chưa có data, sử dụng default và lưu vào localStorage
          setLeaderboard(defaultLeaderboard)
          localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(defaultLeaderboard))
        }
      } catch (error) {
        console.error("Error loading leaderboard:", error)
        setLeaderboard(defaultLeaderboard)
      } finally {
        setIsLoading(false)
      }
    }

    loadLeaderboard()
  }, [])

  // Hàm thêm điểm số mới vào leaderboard
  const addScore = (name: string, score: number) => {
    if (!name.trim()) {
      name = "ANONYMOUS"
    }

    const newEntry: LeaderboardEntry = {
      rank: 0, // Sẽ được cập nhật sau khi sort
      name: name.trim().toUpperCase().substring(0, 15), // Giới hạn độ dài tên
      score: score
    }

    // Thêm entry mới và sort theo điểm số
    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score) // Sort từ cao đến thấp
      .slice(0, 10) // Chỉ giữ lại top 10
      .map((entry, index) => ({ ...entry, rank: index + 1 })) // Cập nhật rank

    setLeaderboard(updatedLeaderboard)
    
    // Lưu vào localStorage
    try {
      localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(updatedLeaderboard))
    } catch (error) {
      console.error("Error saving leaderboard:", error)
    }

    // Trả về rank của điểm số mới (hoặc null nếu không vào top 10)
    const newRank = updatedLeaderboard.findIndex(entry => 
      entry.name === newEntry.name && 
      entry.score === newEntry.score
    )
    
    return newRank >= 0 ? newRank + 1 : null
  }

  // Hàm reset leaderboard về default
  const resetLeaderboard = () => {
    setLeaderboard(defaultLeaderboard)
    localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(defaultLeaderboard))
  }

  // Hàm kiểm tra xem điểm số có đủ vào top 10 không
  const isTopScore = (score: number) => {
    // For testing: any score > 0 is eligible
    if (score <= 0) return false
    if (leaderboard.length < 10) return true
    return score > leaderboard[leaderboard.length - 1].score
  }

  return {
    leaderboard,
    isLoading,
    addScore,
    resetLeaderboard,
    isTopScore
  }
}
