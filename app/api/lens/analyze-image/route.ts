import { generateObject } from "ai"
import { xai } from "@ai-sdk/xai"
import { z } from "zod"
import type { NextRequest } from "next/server"

const ImageAnalysisSchema = z.object({
  summary: z.string().describe("A concise summary of what the image shows"),
  conciseDescription: z.string().describe("A very brief, one-sentence description of the image"),
  isGraph: z.boolean().describe("Whether this image appears to be a graph, chart, or data visualization"),
  graphType: z.string().optional().describe("If it's a graph, what type (bar chart, line graph, pie chart, etc.)"),
  recreationInstructions: z.string().optional().describe("If it's a graph, detailed instructions on how to recreate it"),
  keyDataPoints: z.array(z.string()).optional().describe("Key data points or values visible in the image"),
  insights: z.string().optional().describe("Key insights or patterns visible in the image")
})

export async function POST(request: NextRequest) {
  try {
    const { imageData, imageType } = await request.json()

    if (!imageData) {
      return new Response("Image data is required", { status: 400 })
    }

    const result = await generateObject({
      model: xai("grok-4", {
        apiKey: process.env.XAI_API_KEY,
      }),
      schema: ImageAnalysisSchema,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this image and provide a comprehensive analysis. If it's a graph or chart, focus on identifying the data and providing clear recreation instructions. If it's a regular image, provide a clear summary and concise description."
            },
            {
              type: "image",
              image: `data:${imageType || 'image/png'};base64,${imageData}`
            }
          ]
        }
      ]
    })

    return Response.json({ 
      analysis: result.object,
      success: true 
    })
  } catch (error) {
    console.error("Error analyzing image:", error)
    return new Response("Failed to analyze image", { status: 500 })
  }
}
