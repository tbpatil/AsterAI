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
      prompt: `Make the following content more concise while preserving all key information. Remove unnecessary words and redundancy:\n\n${content}`,
      system:
        "You are an expert editor that makes content more concise without losing important information. Focus on clarity and brevity.",
    })

    return Response.json({ conciseText: result.text })
  } catch (error) {
    console.error("Error making content concise:", error)
    return new Response("Failed to make content concise", { status: 500 })
  }
}
