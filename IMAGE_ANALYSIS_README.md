# Image Analysis Feature

This document describes the image analysis functionality in the AsterAI project.

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

### 2. Enhanced Lens Overlay
- **Component**: `LensOverlay.tsx`
- **Features**:
  - Detects when hovering over images
  - Shows "Analyze Image" option for images
  - Integrates with existing text analysis features
  - Displays formatted analysis results

## Usage

### For Document Images
1. Hold Alt key to activate Lens Mode
2. Hover over any image in the document
3. Click "Analyze Image" to get analysis

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

### Environment Variables Required
- `XAI_API_KEY`: Your XAI API key for image analysis

## Future Enhancements
- Support for more image formats
- Batch image analysis
- Export analysis results
- Advanced graph recreation tools
