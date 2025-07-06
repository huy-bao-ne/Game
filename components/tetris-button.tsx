"use client"

import { motion } from "framer-motion"

interface TetorisButtonProps {
  label: string
  onClick: () => void
  color: "blue" | "pink" | "purple" | "yellow" // gioi han 4 mau
}

// hieu ung 3D cho nut 
export default function TetorisButton({ label, onClick, color }: TetorisButtonProps) {
  const colorSchemes = { // mau sac va hieu ung (Tailwind CSS)
    blue:    { bg: "bg-blue-500",    shadow: "shadow-blue-700",    highlight: "bg-blue-400",    text: "text-white" },
    pink:    { bg: "bg-pink-500",    shadow: "shadow-pink-700",    highlight: "bg-pink-400",    text: "text-white" },
    purple:  { bg: "bg-purple-500",  shadow: "shadow-purple-700",  highlight: "bg-purple-400",  text: "text-white" },
    yellow:  { bg: "bg-yellow-400",  shadow: "shadow-yellow-600",  highlight: "bg-yellow-300",  text: "text-gray-800" },
  }
  const scheme = colorSchemes[color] // lay mau sac tuong ung 

  return (
    <motion.div
      className="relative w-64 h-16 group"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {/*nen nut*/}
      <div className={`absolute inset-0 ${scheme.bg} rounded-none border-4 border-black`} />
      {/*bong 3D*/}
      <div className={`absolute inset-0 translate-y-2 ${scheme.shadow} border-4 border-black z-[-1]`} />
      {/*hieu ung nut*/}
      <div
        className={`absolute inset-0 ${scheme.highlight} border-4 border-black translate-y-0 
          group-hover:translate-y-1 group-active:translate-y-2 transition-transform duration-100`}
      >
        {/*goc pixel den*/}
        <div className="absolute top-0 left-0 w-2 h-2 bg-black" />
        <div className="absolute top-0 right-0 w-2 h-2 bg-black" />
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-black" />
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-black" />
        <button
          onClick={onClick}
          className={`w-full h-full flex items-center justify-center font-bold text-2xl ${scheme.text} tracking-wider`}
          style={{ fontFamily: "'Press Start 2P', monospace", letterSpacing: "0.1em" }}
        >
          {label}
        </button>
      </div>
    </motion.div>
  )
}