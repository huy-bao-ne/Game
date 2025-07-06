"use client"

import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import TetorisButton from "@/components/tetris-button"

interface SettingsMenuProps {
  onClose: () => void
  isMusicEnabled: boolean
  musicVolume: number
  onMusicToggle: (enabled: boolean) => void
  onVolumeChange: (volume: number) => void
  isModal?: boolean // dieu khien hien thi modal hay khong
}

export default function SettingsMenu({
  onClose,
  isMusicEnabled,
  musicVolume,
  onMusicToggle,
  onVolumeChange,
  isModal = true,
}: SettingsMenuProps) {
  const content = (
    <div className="relative w-full max-w-lg mx-4">
      <div
        className="p-6 border-4 border-black shadow-lg relative"
        style={{ background: "#444b5a" }}
      >
        {/*pixel den*/}
        <div className="absolute top-0 left-0 w-4 h-4 bg-black" />
        <div className="absolute top-0 right-0 w-4 h-4 bg-black" />
        <div className="absolute bottom-0 left-0 w-4 h-4 bg-black" />
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-black" />

        <div className="space-y-6">
          {/*header*/}
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="text-gray-200 hover:text-gray-400"
            >
              <ArrowLeft className="h-6 w-6" />
            </motion.button>
            <h2
              className="text-2xl font-bold text-gray-200 tracking-wider"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              SETTINGS
            </h2>
            <div className="w-6" /> {/* Spacer */}
          </div>

          {/*seeting*/}
          <div className="space-y-8 p-4 bg-white/10 border-4 border-black">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-lg font-semibold text-gray-200">Music</Label>
                <p className="text-sm text-gray-400">Enable or disable background music</p>
              </div>
              <Switch
                checked={isMusicEnabled}
                onCheckedChange={onMusicToggle}
                className="data-[state=checked]:bg-pink-500"
              />
            </div>
            {/*chinh am luong*/}
            <div>
              <Label className="text-lg font-semibold text-gray-200">Volume</Label>
              <p className="text-sm text-gray-400">Adjust music volume</p>
              <div className="flex items-center gap-4 mt-2">
                <Slider
                  disabled={!isMusicEnabled}
                  value={[musicVolume]}
                  onValueChange={(value) => onVolumeChange(value[0])}
                  max={100}
                  step={1}
                  className={!isMusicEnabled ? "opacity-50" : ""}
                />
                <span className="min-w-[3ch] text-gray-200 font-mono">{musicVolume}</span>
              </div>
            </div>
          </div>

          {/*nhac*/}
          <div className="p-3 bg-black/20 border-2 border-black">
            <h3
              className="text-sm font-semibold text-gray-400"
              style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.6rem" }}
            >
              MUSIC SETTING
            </h3>
          </div>

          {/*quay lai*/}
          {isModal && (
            <div className="flex justify-center">
              <TetorisButton label="RETURN" onClick={onClose} color="yellow" />
            </div>
          )}
        </div>
      </div>
    </div>
  )

  if (isModal) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        {content}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // bat dau o vi tri thap hon
      animate={{ opacity: 1, y: 0 }} // di chuyen len tren
      transition={{ duration: 0.5 }} // thoi gian di chuyen
    >
      {content}
    </motion.div>
  )
}