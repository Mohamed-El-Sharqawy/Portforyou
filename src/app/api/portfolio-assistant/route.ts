import { openAIClient } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    // Call OpenAI API
    const completion = await openAIClient.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a professional portfolio content assistant specializing in helping users create compelling content for their portfolios. 
          
          Your expertise includes:
          - Crafting engaging headlines and taglines
          - Writing professional bios and about sections
          - Creating compelling service descriptions
          - Developing project descriptions
          - Writing testimonial content
          - Generating call-to-action text
          
          Guidelines:
          - Be concise and impactful - portfolio content should be brief but powerful
          - Use professional, elegant language appropriate for a dark-themed portfolio
          - Maintain the user's voice and expertise level
          - Provide content that stands out and captures attention
          - When appropriate, offer multiple options for the user to choose from
          - Focus on helping the user showcase their skills and achievements effectively
          
          Always respond in a helpful, professional manner and focus exclusively on portfolio content creation.`,
        },
        ...messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    // Extract the response
    const content = completion.choices[0].message.content;

    // Return the generated content
    return NextResponse.json({
      success: true,
      content,
    });
  } catch (error) {
    console.error("Error generating portfolio content:", error);
    return NextResponse.json(
      { error: "Failed to generate portfolio content" },
      { status: 500 }
    );
  }
}
