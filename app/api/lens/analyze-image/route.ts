import { generateText } from "ai"
import { createXai } from "@ai-sdk/xai"
import type { NextRequest } from "next/server"

const xai = createXai({
  apiKey: process.env.XAI_API_KEY,
})

// Helper functions to parse the response
function extractSection(text: string, section: string): string {
  const regex = new RegExp(`\\*\\*${section}:\\*\\*\\s*([^\\n]+)`, 'i')
  const match = text.match(regex)
  return match ? match[1].trim() : ""
}

function extractBulletPoints(text: string): string[] {
  const bulletRegex = /•\s*([^\n]+)/g
  const matches = []
  let match
  while ((match = bulletRegex.exec(text)) !== null) {
    matches.push(match[1].trim())
  }
  return matches
}

export async function POST(request: NextRequest) {
  try {
    const { imageData, imageType } = await request.json()

    if (!imageData) {
      return new Response("Image data is required", { status: 400 })
    }

    const result = await generateText({
      model: xai("grok-4"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this image and provide a comprehensive analysis. Format your response as follows:\n\n**Summary:** [Brief summary of what the image shows]\n\n**Description:** [One-sentence description]\n\n**Chart Type:** [If it's a graph/chart, specify the type]\n\n**Key Data Points:**\n• [List key data points if applicable]\n\n**Insights:** [Key insights or patterns]"
            },
            {
              type: "image",
              image: `data:${imageType || 'image/png'};base64,${imageData}`
            }
          ]
        }
      ]
    })

    // Parse the response to create a structured object
    const analysisText = result.text
    const analysis = {
      summary: extractSection(analysisText, "Summary"),
      conciseDescription: extractSection(analysisText, "Description"),
      isGraph: analysisText.toLowerCase().includes("chart") || analysisText.toLowerCase().includes("graph"),
      graphType: extractSection(analysisText, "Chart Type"),
      keyDataPoints: extractBulletPoints(analysisText),
      insights: extractSection(analysisText, "Insights")
    }

    return Response.json({ 
      analysis,
      success: true 
    })
  } catch (error) {
    console.error("Error analyzing image:", error)
    return new Response("Failed to analyze image", { status: 500 })
  }
}
