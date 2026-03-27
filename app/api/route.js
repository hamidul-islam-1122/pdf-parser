import { NextResponse } from "next/server";
import { OpenRouter } from "@openrouter/sdk";

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.text) {
      return NextResponse.json({ summary: "No text provided" });
    }

    const completion = await openrouter.chat.send({
      chatGenerationParams: {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: "Summarize: " + body.text.slice(0, 2000),
          },
        ],
      },
    });

    const result =
      completion.choices?.[0]?.message?.content || "No response";

    return NextResponse.json({ summary: result });

  } catch (error) {
    console.error("API ERROR FULL:", error);

    return NextResponse.json(
      { summary: "Error occurred", error: String(error) },
      { status: 500 }
    );
  }
}