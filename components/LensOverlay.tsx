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
        return // Don't clear hovered element when over popover to keep it visible
      }

      // Find the closest interactive element
      const interactiveElement = target.closest("p, h1, h2, h3, h4, h5, h6, img, section, div") as Element

      if (interactiveElement && interactiveElement !== hoveredElement) {
        setHoveredElement(interactiveElement)

        // Calculate popover position
        const rect = interactiveElement.getBoundingClientRect()
        const x = Math.min(e.clientX + 10, window.innerWidth - 320)
        const y = Math.max(10, rect.top - 60)

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

    try {
      let response
      let resultContent = ""

      // Call appropriate API endpoint based on action
      switch (action) {
        case "Summarize":
          response = await fetch("/api/lens/summarize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content }),
          })
          if (response.ok) {
            const data = await response.json()
            resultContent = data.summary
          }
          break

        case "Make concise":
          response = await fetch("/api/lens/concise", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content }),
          })
          if (response.ok) {
            const data = await response.json()
            resultContent = data.conciseText
          }
          break

        case "Visualize":
          response = await fetch("/api/lens/visualize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content }),
          })
          if (response.ok) {
            const data = await response.json()
            resultContent = data.visualization
          }
          break

        case "Find similar":
          response = await fetch("/api/lens/similar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content }),
          })
          if (response.ok) {
            const data = await response.json()
            resultContent = data.similarContent
          }
          break

        default:
          resultContent = "Action not supported"
      }

      // Remove loading state
      setLoadingCards((prev) => prev.filter((id) => id !== cardId))

      // Create result card with Grok response
      const newCard: ResultCardData = {
        id: cardId,
        title: getActionTitle(action),
        content: resultContent || `Failed to process ${action.toLowerCase()} request`,
        sourceUrl: action === "Find similar" ? "https://example.com/similar" : undefined,
        position: { top: rect.bottom, left: rect.left },
      }

      setResultCards((prev) => [...prev, newCard])
    } catch (error) {
      console.error(`Error with ${action}:`, error)

      // Remove loading state and show error
      setLoadingCards((prev) => prev.filter((id) => id !== cardId))

      const errorCard: ResultCardData = {
        id: cardId,
        title: getActionTitle(action),
        content: `Error: Failed to ${action.toLowerCase()} content. Please try again.`,
        position: {
          top: hoveredElement.getBoundingClientRect().bottom,
          left: hoveredElement.getBoundingClientRect().left,
        },
      }

      setResultCards((prev) => [...prev, errorCard])
    }
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

  const getElementContent = (element: Element): string => {
    if (element.tagName === "IMG") {
      return (element as HTMLImageElement).alt || "Image content"
    }
    return element.textContent?.slice(0, 200) || ""
  }

  const dismissCard = (cardId: string) => {
    setResultCards((prev) => prev.filter((card) => card.id !== cardId))
  }

  return (
    <>
      {/* Lens Mode Indicator Badge */}
      <AnimatePresence>
        {isLensMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
          >
            <Badge variant="default" className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-4 py-2 text-sm font-medium shadow-lg">
              🔍 Lens Mode Active - Click on any text to analyze
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>

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
            <div className="w-full h-full border-2 border-gray-400 dark:border-gray-500 rounded-md shadow-lg shadow-gray-400/50 dark:shadow-gray-500/50" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Popover */}
      {isLensMode && hoveredElement && (
        <div
          className="fixed z-50 pointer-events-auto"
          style={{ top: popoverPosition.y, left: popoverPosition.x }}
          data-lens-overlay
          onMouseEnter={() => {
            // Keep the popover visible when hovering over it
          }}
          onMouseLeave={(e) => {
            // Only hide if we're not moving to the hovered element
            const relatedTarget = e.relatedTarget as Element
            if (!relatedTarget?.closest("[data-lens-overlay]") && !hoveredElement?.contains(relatedTarget)) {
              setHoveredElement(null)
            }
          }}
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
                  className="cursor-pointer hover:bg-white hover:text-black transition-all duration-200 text-xs px-3 py-2 select-none hover:scale-105 active:scale-95"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAction(action, getElementContent(hoveredElement))
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
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
