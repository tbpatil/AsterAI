import { generateText } from "ai"
import { xai } from "@ai-sdk/xai"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json()

    if (!content) {
      return new Response("Content is required", { status: 400 })
    }

    const result = await generateText({
      model: xai("grok-4", {
        apiKey: process.env.XAI_API_KEY,
      }),
      prompt: `Analyze the following content and suggest how it could be visualized (charts, diagrams, infographics, etc.). Describe the visual representation in detail:\n\n${content}`,
      system:
        "You are a data visualization expert. Suggest appropriate visual representations for content, explaining what type of chart, diagram, or visual would best represent the information.",
    })

    return Response.json({ visualization: result.text })
  } catch (error) {
    console.error("Error generating visualization:", error)
    return new Response("Failed to generate visualization", { status: 500 })
  }
}
