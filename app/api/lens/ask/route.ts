import { generateText } from "ai"
import { xai } from "@ai-sdk/xai"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { content, question } = await request.json()

    if (!content) {
      return new Response("Content is required", { status: 400 })
    }

    if (!question) {
      return new Response("Question is required", { status: 400 })
    }

    const result = await generateText({
      model: xai("grok-4", {
        apiKey: process.env.XAI_API_KEY,
      }),
      prompt: `Answer this question based on the content provided. Be direct and concise.

Content: ${content}

Question: ${question}

Answer:`,
      system:
        "Answer questions directly and concisely based only on the provided content. Do not add explanations, disclaimers, or additional context unless specifically asked.",
      maxTokens: 200, // Limit response length
    })

    return Response.json({ answer: result.text })
  } catch (error) {
    console.error("Error generating answer:", error)
    
    let errorMessage = "Failed to generate answer"
    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        errorMessage = "Request timed out. Please try again."
      } else if (error.message.includes('API')) {
        errorMessage = "API error. Please check your configuration."
      }
    }
    
    return new Response(JSON.stringify({ error: errorMessage }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }
}
