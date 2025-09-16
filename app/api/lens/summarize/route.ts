import { generateText } from "ai"
import { createXai } from "@ai-sdk/xai"
import type { NextRequest } from "next/server"

const xai = createXai({
  apiKey: process.env.XAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json()

    if (!content) {
      return new Response("Content is required", { status: 400 })
    }

    const result = await generateText({
      model: xai("grok-4"),
      prompt: `Summarize the following content in 2-3 concise sentences, focusing on the key points and main ideas:\n\n${content}`,
      system:
        "You are a helpful AI assistant that creates clear, concise summaries. Focus on extracting the most important information and presenting it in an easy-to-understand format.",
    })

    return Response.json({ summary: result.text })
  } catch (error) {
    console.error("Error generating summary:", error)
    return new Response("Failed to generate summary", { status: 500 })
  }
}
