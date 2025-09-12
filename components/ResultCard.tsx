"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

interface ResultCardProps {
  title: string
  content: string
  sourceUrl?: string
  onDismiss: () => void
  position: { top: number; left: number }
}

export function ResultCard({ title, content, sourceUrl, onDismiss, position }: ResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed z-50"
      style={{
        top: position.top + 10,
        left: Math.max(16, Math.min(position.left, window.innerWidth - 320)),
      }}
    >
      <Card className="w-80 p-4 bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{title}</h3>
          <button
            onClick={onDismiss}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{content}</p>

          {sourceUrl && (
            <a
              href={sourceUrl}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline block"
              target="_blank"
              rel="noopener noreferrer"
            >
              View source →
            </a>
          )}

          <div className="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
