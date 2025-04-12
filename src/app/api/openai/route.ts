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
            "You are an AI content enhancer. Your job is to take user-provided text and rewrite it to be professional, engaging, and suitable for a portfolio. Ensure clarity, proper grammar, and a polished tone while keeping the word count as close as possible to the original input unless the input is not appropriate for a portfolio or don't express enough for the visitor, if it's not detailed enough then you can edit it however you want but don't reply with 'I am unable to enhance the provided text as it lacks sufficient content. Please provide a more detailed input for improvement'. Respond with only the improved text and nothing else.",
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
