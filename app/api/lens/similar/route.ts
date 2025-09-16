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
      prompt: `Based on the following content, suggest similar topics, related concepts, or areas for further exploration. Provide specific suggestions:\n\n${content}`,
      system:
        "You are a research assistant that helps find related content and topics. Suggest specific areas, concepts, or resources that are similar or related to the given content.",
    })

    return Response.json({ similarContent: result.text })
  } catch (error) {
    console.error("Error finding similar content:", error)
    return new Response("Failed to find similar content", { status: 500 })
  }
}
