# Image Analysis Feature

This document describes the new image analysis functionality added to the AsterAI project.

## Features

### 1. Image Analysis API
- **Endpoint**: `/api/lens/analyze-image`
- **Method**: POST
- **Purpose**: Analyzes images using XAI's vision capabilities
- **Input**: Base64 encoded image data
- **Output**: Comprehensive image analysis including:
  - Summary of the image content
  - Concise description
  - Graph/chart detection
  - Recreation instructions for graphs
  - Key data points extraction
  - Insights and patterns

### 2. PDF Viewer with Image Analysis
- **Component**: `PDFViewer.tsx`
- **Features**:
  - Upload and view PDF files using react-pdf
  - Click on images within PDFs to analyze them
  - Zoom, rotate, and navigate through PDF pages
  - Sample images for testing functionality

### 3. Enhanced Lens Overlay
- **Component**: `LensOverlay.tsx`
- **New Features**:
  - Detects when hovering over images
  - Shows "Analyze Image" option for images
  - Integrates with existing text analysis features
  - Displays formatted analysis results

## Usage

### For PDF Images
1. Switch to "PDF Viewer" mode using the toggle in the top-right
2. Upload a PDF file
3. Click on any image within the PDF
4. View the comprehensive analysis in the overlay

### For Document Images
1. Stay in "Document" mode
2. Hold Alt key to activate Lens Mode
3. Hover over any image in the document
4. Click "Analyze Image" to get analysis

### Analysis Results Include
- **Summary**: Detailed description of what the image shows
- **Description**: Brief, one-sentence summary
- **Graph Detection**: Identifies if the image is a chart/graph
- **Chart Type**: Specific type of visualization (bar chart, line graph, etc.)
- **Recreation Instructions**: Step-by-step guide to recreate the graph
- **Key Data Points**: Important values and metrics visible in the image
- **Insights**: Patterns and observations from the data

## Technical Implementation

### API Structure
```typescript
interface ImageAnalysisResult {
  summary: string
  conciseDescription: string
  isGraph: boolean
  graphType?: string
  recreationInstructions?: string
  keyDataPoints?: string[]
  insights?: string
}
```

### Dependencies Added
- `react-pdf`: For PDF rendering
- `pdfjs-dist`: PDF.js library for PDF processing

### Environment Variables Required
- `XAI_API_KEY`: Your XAI API key for image analysis

## Future Enhancements
- Support for more image formats
- Batch image analysis
- Export analysis results
- Integration with more PDF libraries
- Advanced graph recreation tools
