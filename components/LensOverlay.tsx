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
  const [selectedElement, setSelectedElement] = useState<Element | null>(null)
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 })
  const [resultCards, setResultCards] = useState<ResultCardData[]>([])
  const [loadingCards, setLoadingCards] = useState<string[]>([])
  const [isClient, setIsClient] = useState(false)
  const [showAskModal, setShowAskModal] = useState(false)
  const [askQuestion, setAskQuestion] = useState("")
  const overlayRef = useRef<HTMLDivElement>(null)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])


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
        const x = Math.min(e.clientX + 10, window.innerWidth - 400)
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

      // Check if the hovered element is an image
      const isImage = hoveredElement.tagName === "IMG"
      
      if (isImage && action === "Analyze Image") {
        // Handle image analysis
        const img = hoveredElement as HTMLImageElement
        
        // Convert image to base64
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        if (!ctx) throw new Error("Could not get canvas context")
        
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        ctx.drawImage(img, 0, 0)
        
        const imageData = canvas.toDataURL("image/png").split(",")[1]

        response = await fetch("/api/lens/analyze-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            imageData,
            imageType: "image/png"
          }),
        })
        
        if (response.ok) {
          const data = await response.json()
          const analysis = data.analysis
          
          // Format the analysis result
          resultContent = `**Summary:** ${analysis.summary}\n\n**Description:** ${analysis.conciseDescription}`
          
          if (analysis.isGraph) {
            resultContent += `\n\n**Chart Type:** ${analysis.graphType || "Data Visualization"}`
            if (analysis.recreationInstructions) {
              resultContent += `\n\n**How to Recreate:**\n${analysis.recreationInstructions}`
            }
            if (analysis.keyDataPoints && analysis.keyDataPoints.length > 0) {
              resultContent += `\n\n**Key Data Points:**\n${analysis.keyDataPoints.map((point: string) => `• ${point}`).join('\n')}`
            }
            if (analysis.insights) {
              resultContent += `\n\n**Insights:** ${analysis.insights}`
            }
          }
        }
      } else {
        // Call appropriate API endpoint based on action for text content
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

          case "Ask":
            // This will be handled separately with the modal
            return

          default:
            resultContent = "Action not supported"
        }
      }

      // Remove loading state
      setLoadingCards((prev) => prev.filter((id) => id !== cardId))

      // Create result card with Grok response
      const newCard: ResultCardData = {
        id: cardId,
        title: getActionTitle(action),
        content: resultContent || `Failed to process ${action.toLowerCase()} request`,
        sourceUrl: action === "Find similar" ? "https://example.com/similar" : undefined,
        position: getSmartCardPosition(rect),
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
        position: getSmartCardPosition(hoveredElement.getBoundingClientRect()),
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
      case "Analyze Image":
        return "Image Analysis"
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

  const getSmartCardPosition = (rect: DOMRect) => {
    const cardHeight = 200 // Estimated card height
    const viewportHeight = window.innerHeight
    const spaceBelow = viewportHeight - rect.bottom
    const spaceAbove = rect.top
    
    let cardTop: number
    let cardLeft: number
    
    // If there's enough space below, place it below
    if (spaceBelow > cardHeight) {
      cardTop = rect.bottom + 10
    } 
    // If there's more space above, place it above
    else if (spaceAbove > spaceBelow) {
      cardTop = Math.max(10, rect.top - cardHeight - 10)
    }
    // Otherwise, place it in the center of the viewport
    else {
      cardTop = Math.max(10, (viewportHeight - cardHeight) / 2)
    }
    
    // Ensure the card doesn't go off the right edge
    cardLeft = Math.min(rect.left, window.innerWidth - 350)
    
    return { top: cardTop, left: cardLeft }
  }

  const dismissCard = (cardId: string) => {
    setResultCards((prev) => prev.filter((card) => card.id !== cardId))
  }

  const handleAskAction = () => {
    if (!hoveredElement) return
    setSelectedElement(hoveredElement)
    setShowAskModal(true)
    setAskQuestion("")
  }

  const handleAskSubmit = async () => {
    if (!selectedElement || !askQuestion.trim()) return

    const content = getElementContent(selectedElement)
    const cardId = `ask-${Date.now()}`
    const rect = selectedElement.getBoundingClientRect()

    // Add loading state
    setLoadingCards((prev) => [...prev, cardId])
    setShowAskModal(false)

    try {
      // Add timeout to prevent hanging
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

      const response = await fetch("/api/lens/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, question: askQuestion }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      let resultContent = ""
      if (response.ok) {
        const data = await response.json()
        resultContent = data.answer || "No answer received"
      } else {
        resultContent = `Failed to get answer (${response.status}). Please try again.`
      }

      // Remove loading state
      setLoadingCards((prev) => prev.filter((id) => id !== cardId))

      // Create result card with smart positioning
      const newCard: ResultCardData = {
        id: cardId,
        title: `Q: ${askQuestion}`,
        content: resultContent,
        position: getSmartCardPosition(rect),
      }

      setResultCards((prev) => [...prev, newCard])
    } catch (error) {
      console.error("Error asking question:", error)

      // Remove loading state and show error
      setLoadingCards((prev) => prev.filter((id) => id !== cardId))

      let errorMessage = "Error: Failed to get answer. Please try again."
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = "Error: Request timed out. The AI is taking too long to respond. Please try again."
        } else if (error.message.includes('fetch')) {
          errorMessage = "Error: Network error. Please check your connection and try again."
        }
      }

      const errorCard: ResultCardData = {
        id: cardId,
        title: `Q: ${askQuestion}`,
        content: errorMessage,
        position: getSmartCardPosition(selectedElement.getBoundingClientRect()),
      }

      setResultCards((prev) => [...prev, errorCard])
    }
  }

  return (
    <>
      {/* Only render on client side */}
      {!isClient ? null : (
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
                <Badge variant="default" className="bg-blue-600 text-white px-4 py-2 text-sm font-medium shadow-lg">
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
            <div className="grid grid-cols-3 gap-2 w-80">
              {hoveredElement?.tagName === "IMG" ? (
                // Image-specific actions
                ["Analyze Image"].map((action) => (
                  <Badge
                    key={action}
                    variant="secondary"
                    className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-200 text-xs px-2 py-1 select-none hover:scale-105 active:scale-95 text-center"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAction(action, getElementContent(hoveredElement))
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    {action}
                  </Badge>
                ))
              ) : (
                // Text-specific actions
                ["Summarize", "Make concise", "Visualize", "Find similar", "Ask"].map((action) => (
                  <Badge
                    key={action}
                    variant="secondary"
                    className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-200 text-xs px-2 py-1 select-none hover:scale-105 active:scale-95 text-center"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (action === "Ask") {
                        handleAskAction()
                      } else {
                        handleAction(action, getElementContent(hoveredElement))
                      }
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    {action}
                  </Badge>
                ))
              )}
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

          {/* Ask Question Modal */}
          <AnimatePresence>
            {showAskModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={() => setShowAskModal(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-6 w-full max-w-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Ask about this content
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    What would you like to know about the selected content?
                  </p>
                  <textarea
                    value={askQuestion}
                    onChange={(e) => setAskQuestion(e.target.value)}
                    placeholder="Type your question here..."
                    className="w-full h-24 p-3 border border-gray-300 dark:border-gray-600 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    autoFocus
                  />
                  <div className="flex gap-3 mt-4 justify-end">
                    <button
                      onClick={() => setShowAskModal(false)}
                      className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleAskSubmit()
                      }}
                      disabled={!askQuestion.trim()}
                      className={`px-4 py-2 text-sm rounded-md transition-colors ${
                        askQuestion.trim() 
                          ? "bg-blue-600 text-white hover:bg-blue-700" 
                          : "bg-gray-400 text-gray-200 cursor-not-allowed"
                      }`}
                    >
                      Ask
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  )
}
