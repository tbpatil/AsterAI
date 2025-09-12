"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ResultCard } from "./ResultCard"
import { SkeletonCard } from "./ui/SkeletonCard"

interface ResultCardData {
  id: string
  title: string
  content: string
  sourceUrl?: string
  position: { top: number; left: number }
}

export function LensOverlay() {
  const [isLensMode, setIsLensMode] = useState(false)
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null)
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 })
  const [resultCards, setResultCards] = useState<ResultCardData[]>([])
  const [loadingCards, setLoadingCards] = useState<string[]>([])
  const overlayRef = useRef<HTMLDivElement>(null)

  // Handle Alt key press/release
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && !isLensMode) {
        setIsLensMode(true)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!e.altKey && isLensMode) {
        setIsLensMode(false)
        setHoveredElement(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [isLensMode])

  // Handle mouse movement in lens mode
  useEffect(() => {
    if (!isLensMode) return

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as Element

      // Skip if hovering over overlay elements
      if (target.closest("[data-lens-overlay]")) {
        setHoveredElement(null)
        return
      }

      // Find the closest interactive element
      const interactiveElement = target.closest("p, h1, h2, h3, h4, h5, h6, img, section, div") as Element

      if (interactiveElement && interactiveElement !== hoveredElement) {
        setHoveredElement(interactiveElement)

        // Calculate popover position
        const rect = interactiveElement.getBoundingClientRect()
        const x = Math.min(e.clientX, window.innerWidth - 300)
        const y = rect.top - 10

        setPopoverPosition({ x, y })
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [isLensMode, hoveredElement])

  const handleAction = async (action: string, content: string) => {
    if (!hoveredElement) return

    const rect = hoveredElement.getBoundingClientRect()
    const cardId = `${action}-${Date.now()}`

    // Add loading state
    setLoadingCards((prev) => [...prev, cardId])

    // Simulate API call delay
    setTimeout(() => {
      setLoadingCards((prev) => prev.filter((id) => id !== cardId))

      const newCard: ResultCardData = {
        id: cardId,
        title: getActionTitle(action),
        content: getActionContent(action, content),
        sourceUrl: action === "Find similar" ? "https://example.com/similar" : undefined,
        position: { top: rect.bottom, left: rect.left },
      }

      setResultCards((prev) => [...prev, newCard])
    }, 1500)
  }

  const getActionTitle = (action: string): string => {
    switch (action) {
      case "Summarize":
        return "Content Summary"
      case "Make concise":
        return "Concise Version"
      case "Visualize":
        return "Visual Analysis"
      case "Find similar":
        return "Related Content"
      default:
        return action
    }
  }

  const getActionContent = (action: string, content: string): string => {
    const truncatedContent = content.slice(0, 100) + (content.length > 100 ? "..." : "")

    switch (action) {
      case "Summarize":
        return `This section discusses key findings in document interaction research, highlighting the 40% improvement in task completion and 94% accuracy in content categorization.`
      case "Make concise":
        return `Lens-based document interaction improves user productivity by 40% through real-time content analysis and contextual tools.`
      case "Visualize":
        return `This content could be represented as a flowchart showing the interaction pipeline: User Input → Content Detection → Analysis → Results Display.`
      case "Find similar":
        return `Found 3 related papers on interactive document systems, 2 articles on content analysis methods, and 1 survey on user interface design patterns.`
      default:
        return `Processed: ${truncatedContent}`
    }
  }

  const dismissCard = (cardId: string) => {
    setResultCards((prev) => prev.filter((card) => card.id !== cardId))
  }

  const getElementContent = (element: Element): string => {
    if (element.tagName === "IMG") {
      return (element as HTMLImageElement).alt || "Image content"
    }
    return element.textContent?.slice(0, 200) || ""
  }

  return (
    <>
      {/* Lens Mode Overlay */}
      <AnimatePresence>
        {isLensMode && (
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40 pointer-events-none"
            data-lens-overlay
          />
        )}
      </AnimatePresence>

      {/* Hovered Element Highlight */}
      <AnimatePresence>
        {isLensMode && hoveredElement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed pointer-events-none z-50"
            style={{
              top: hoveredElement.getBoundingClientRect().top - 2,
              left: hoveredElement.getBoundingClientRect().left - 2,
              width: hoveredElement.getBoundingClientRect().width + 4,
              height: hoveredElement.getBoundingClientRect().height + 4,
            }}
          >
            <div className="w-full h-full border-2 border-blue-400 rounded-md shadow-lg shadow-blue-400/50" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Popover */}
      {isLensMode && hoveredElement && (
        <div
          className="fixed z-50 pointer-events-auto"
          style={{ top: popoverPosition.y, left: popoverPosition.x }}
          data-lens-overlay
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-3"
          >
            <div className="flex gap-2">
              {["Summarize", "Make concise", "Visualize", "Find similar"].map((action) => (
                <Badge
                  key={action}
                  variant="secondary"
                  className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors text-xs px-2 py-1"
                  onClick={() => handleAction(action, getElementContent(hoveredElement))}
                >
                  {action}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Loading Skeleton Cards */}
      <AnimatePresence>
        {loadingCards.map((cardId) => (
          <motion.div
            key={cardId}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed z-50"
            style={{
              top: hoveredElement?.getBoundingClientRect().bottom || 0 + 10,
              left: Math.max(16, Math.min(hoveredElement?.getBoundingClientRect().left || 0, window.innerWidth - 320)),
            }}
          >
            <SkeletonCard />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Result Cards */}
      <AnimatePresence>
        {resultCards.map((card) => (
          <ResultCard
            key={card.id}
            title={card.title}
            content={card.content}
            sourceUrl={card.sourceUrl}
            position={card.position}
            onDismiss={() => dismissCard(card.id)}
          />
        ))}
      </AnimatePresence>
    </>
  )
}
