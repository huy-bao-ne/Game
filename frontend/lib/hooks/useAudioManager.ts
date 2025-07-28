import { useState, useEffect, useCallback } from "react"

// Biến xử lý nhạc global
let audioContext: AudioContext | null = null
let audioSource: AudioBufferSourceNode | null = null
let gainNode: GainNode | null = null
let audioBuffer: AudioBuffer | null = null
let isPlaying = false

export const useAudioManager = () => {
  const [isMusicEnabled, setIsMusicEnabled] = useState(false)
  const [musicVolume, setMusicVolume] = useState(50)

  // Khởi tạo audio context
  useEffect(() => {
    const initAudio = async () => {
      if (!audioContext) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        gainNode = audioContext.createGain()
        gainNode.connect(audioContext.destination)
        try {
          const response = await fetch("/sounds/game music.mp3")
          const arrayBuffer = await response.arrayBuffer()
          audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
        } catch (error) {
          console.error("Error loading audio:", error)
        }
      }
    }
    initAudio()
    return () => {
      if (audioContext) {
        audioContext.close()
        audioContext = null
        audioBuffer = null
        isPlaying = false
      }
    }
  }, [])

  // Phát nhạc
  const playMusic = useCallback(() => {
    if (!audioContext || !audioBuffer || !gainNode || isPlaying) return
    audioSource = audioContext.createBufferSource()
    audioSource.buffer = audioBuffer
    audioSource.loop = true
    audioSource.connect(gainNode)
    gainNode.gain.value = musicVolume / 100
    audioSource.start(0)
    isPlaying = true
    audioSource.onended = () => {
      isPlaying = false
      if (isMusicEnabled) playMusic()
    }
  }, [musicVolume, isMusicEnabled])

  // Dừng nhạc
  const stopMusic = useCallback(() => {
    if (audioSource) {
      audioSource.stop()
      audioSource = null
      isPlaying = false
    }
  }, [])

  // Xử lý bật/tắt nhạc
  const handleMusicToggle = useCallback(
    (enabled: boolean) => {
      setIsMusicEnabled(enabled)
      if (gainNode) {
        gainNode.gain.value = enabled ? musicVolume / 100 : 0
        if (enabled && !isPlaying) playMusic()
        else if (!enabled) stopMusic()
      }
    },
    [musicVolume, playMusic, stopMusic]
  )

  // Xử lý thay đổi âm lượng
  const handleVolumeChange = useCallback(
    (volume: number) => {
      setMusicVolume(volume)
      if (gainNode && isMusicEnabled) gainNode.gain.value = volume / 100
    },
    [isMusicEnabled]
  )

  // Tự động phát nhạc khi enabled
  useEffect(() => {
    if (isMusicEnabled && !isPlaying) playMusic()
  }, [isMusicEnabled, playMusic])

  return {
    isMusicEnabled,
    musicVolume,
    handleMusicToggle,
    handleVolumeChange,
    playMusic,
    stopMusic
  }
}
