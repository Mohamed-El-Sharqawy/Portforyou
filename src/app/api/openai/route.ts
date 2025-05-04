import { NextResponse } from "next/server";
import { openAIClient } from "@/lib/openai";

export async function POST(request: Request) {
  try {
    const { content, name } = await request.json();

    const completion = await openAIClient.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            `You are an AI grammar enhancer. Your job is to take user-provided text and rewrite it to have proper grammar and spelling. 
            If the input is correct, return the same content. If not, return the enhanced content with proper grammar and spelling. 
            Respond with only the improved text and nothing else.`
        },
        {
          role: "user",
          content,
          name,
        },
      ],
      model: "gpt-4o-mini",
    });

    return NextResponse.json(completion);
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
