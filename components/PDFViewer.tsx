"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { Document, Page, pdfjs } from "react-pdf"
// PDF layer CSS is imported globally in app/layout.tsx

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

interface ImageAnalysisResult {
  summary: string
  conciseDescription: string
  isGraph: boolean
  graphType?: string
  recreationInstructions?: string
  keyDataPoints?: string[]
  insights?: string
}

interface ImageOverlayProps {
  image: HTMLImageElement
  analysis: ImageAnalysisResult
  onClose: () => void
}

function ImageAnalysisOverlay({ image, analysis, onClose }: ImageOverlayProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Image Analysis
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {/* Summary */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Summary</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{analysis.summary}</p>
            </div>

            {/* Concise Description */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Quick Description</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{analysis.conciseDescription}</p>
            </div>

            {/* Graph Analysis */}
            {analysis.isGraph && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {analysis.graphType || "Chart"}
                  </Badge>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Data Visualization</span>
                </div>

                {analysis.recreationInstructions && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      How to Recreate
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {analysis.recreationInstructions}
                    </p>
                  </div>
                )}

                {analysis.keyDataPoints && analysis.keyDataPoints.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Data Points</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      {analysis.keyDataPoints.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysis.insights && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Insights</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{analysis.insights}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function PDFViewer() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null)
  const [imageAnalysis, setImageAnalysis] = useState<ImageAnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setPdfFile(file)
      const url = URL.createObjectURL(file)
      setPdfUrl(url)
      setPageNumber(1)
    }
  }

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setIsLoading(false)
  }

  const onDocumentLoadError = (error: Error) => {
    console.error("Error loading PDF:", error)
    setIsLoading(false)
  }

  const onPageLoadSuccess = () => {
    setIsLoading(false)
  }

  const handleImageClick = async (image: HTMLImageElement) => {
    setIsAnalyzing(true)
    setSelectedImage(image)

    try {
      // Convert image to base64
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
      ctx.drawImage(image, 0, 0)
      
      const imageData = canvas.toDataURL("image/png").split(",")[1]

      const response = await fetch("/api/lens/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          imageData,
          imageType: "image/png"
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setImageAnalysis(data.analysis)
      }
    } catch (error) {
      console.error("Error analyzing image:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const closeImageAnalysis = () => {
    setSelectedImage(null)
    setImageAnalysis(null)
  }

  if (!pdfFile) {
    return (
      <div className="w-full h-96 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center">
        <Upload className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Upload a PDF
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Drag and drop a PDF file here, or click to browse
        </p>
        <Button onClick={() => fileInputRef.current?.click()}>
          <FileText className="h-4 w-4 mr-2" />
          Choose PDF
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            {pdfFile.name}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setScale(Math.max(0.5, scale - 0.1))}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[3rem] text-center">
            {Math.round(scale * 100)}%
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setScale(Math.min(2, scale + 0.1))}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRotation((rotation + 90) % 360)}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto p-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          {pdfUrl ? (
            <div className="space-y-4">
              {/* PDF Document */}
              <div 
                className="border border-gray-200 dark:border-gray-700 shadow-lg bg-white"
                style={{
                  transform: `scale(${scale}) rotate(${rotation}deg)`,
                  transformOrigin: "top center",
                }}
              >
                <Document
                  file={pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  loading={
                    <div className="flex items-center justify-center h-96">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  }
                >
                  <Page
                    pageNumber={pageNumber}
                    scale={1}
                    onLoadSuccess={onPageLoadSuccess}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    className="cursor-crosshair"
                    onClick={(event) => {
                      // Handle image clicks within PDF
                      const target = event.target as HTMLElement
                      if (target.tagName === 'IMG' || target.closest('img')) {
                        const img = target.tagName === 'IMG' ? target as HTMLImageElement : target.closest('img') as HTMLImageElement
                        if (img) {
                          handleImageClick(img)
                        }
                      }
                    }}
                  />
                </Document>
              </div>

              {/* Page Navigation */}
              {numPages && (
                <div className="flex items-center justify-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                    disabled={pageNumber <= 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Page {pageNumber} of {numPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
                    disabled={pageNumber >= numPages}
                  >
                    Next
                  </Button>
                </div>
              )}

              {/* Sample images for demonstration when no PDF is loaded */}
              <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-2">Sample Images for Testing</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Click on these sample images to test the image analysis functionality:
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Sample Chart</h4>
                    <div 
                      className="w-full h-32 bg-blue-100 dark:bg-blue-900 rounded border-2 border-dashed border-blue-300 dark:border-blue-700 flex items-center justify-center cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      onClick={() => {
                        const mockImage = new Image()
                        mockImage.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2Y3ZjhmYyIvPgogIDx0ZXh0IHg9IjEwMCIgeT0iNjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U2FtcGxlIEJhciBDaGFydDwvdGV4dD4KPC9zdmc+"
                        handleImageClick(mockImage)
                      }}
                    >
                      <span className="text-blue-600 dark:text-blue-400 text-sm">Click to analyze chart</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Sample Diagram</h4>
                    <div 
                      className="w-full h-32 bg-green-100 dark:bg-green-900 rounded border-2 border-dashed border-green-300 dark:border-green-700 flex items-center justify-center cursor-pointer hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                      onClick={() => {
                        const mockImage = new Image()
                        mockImage.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2Y3ZjhmYyIvPgogIDx0ZXh0IHg9IjEwMCIgeT0iNjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U2FtcGxlIERpYWdyYW08L3RleHQ+Cjwvc3ZnPg=="
                        handleImageClick(mockImage)
                      }}
                    >
                      <span className="text-green-600 dark:text-green-400 text-sm">Click to analyze diagram</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400">
              Upload a PDF to view its content
            </div>
          )}
        </div>
      </div>

      {/* Image Analysis Overlay */}
      <AnimatePresence>
        {selectedImage && imageAnalysis && (
          <ImageAnalysisOverlay
            image={selectedImage}
            analysis={imageAnalysis}
            onClose={closeImageAnalysis}
          />
        )}
      </AnimatePresence>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-700 dark:text-gray-300">Analyzing image...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
