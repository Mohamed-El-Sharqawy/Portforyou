import { openAIClient } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { resumeText, userId } = await request.json();

    if (!resumeText) {
      return NextResponse.json(
        { error: "No resume text provided" },
        { status: 400 }
      );
    }

    // Define the GraphQL schema template
    const schemaTemplate = `mutation updateAllUserData {
  updateUserTemplate(id: "${userId}", template: {
     hero: {
        hero_heading: ""
        hero_subheading: ""
        hero_paragraph: ""
     }
     logos: [
     {
        img_id: ""
        img_url: ""
     },
     {
        img_id: ""
        img_url: ""
     },
     {
        img_id: ""
        img_url: ""
     },
     {
        img_id: ""
        img_url: ""
     },
     {
        img_id: ""
        img_url: ""
     },
     {
        img_id: ""
        img_url: ""
     },
     ]
     services: [
     {
        description: ""
        title: ""
     },
     {
        description: ""
        title: ""
     },
     {
        description: ""
        title: ""
     },
     ]
     work: [{
        category: ""
        img_id: ""
        img_url: ""
        project_link: ""
        title: ""
     },
     {
        category: ""
        img_id: ""
        img_url: ""
        project_link: ""
        title: ""
     },
     {
        category: ""
        img_id: ""
        img_url: ""
        project_link: ""
        title: ""
     },
     {
        category: ""
        img_id: ""
        img_url: ""
        project_link: ""
        title: ""
     }]
     process: {
        process_heading: ""
        process_paragraph: ""
        steps: [
          {
           step_heading: ""
           step_subheading: ""
           step_paragraph: ""
           step_points: ["", "", ""]
        },
        {
           step_heading: ""
           step_subheading: ""
           step_paragraph: ""
           step_points: ["", "", ""]
        },
        {
           step_heading: ""
           step_subheading: ""
           step_paragraph: ""
           step_points: ["", "", ""]
        },
        {
           step_heading: ""
           step_subheading: ""
           step_paragraph: ""
           step_points: ["", "", ""]
        },
        {
           step_heading: ""
           step_subheading: ""
           step_paragraph: ""
           step_points: ["", "", ""]
        },
        ]
     }
     testimonials: {
        testimonials_heading: ""
        testimonials_paragraph: ""
        testimonials: [
          {
           testimonial_heading: ""
           testimonial_paragraph: ""
           testimonial_client: {
              client_company: ""
              client_img_id: ""
              client_img_url: ""
              client_name: ""
           }
        },
        {
           testimonial_heading: ""
           testimonial_paragraph: ""
           testimonial_client: {
              client_company: ""
              client_img_id: ""
              client_img_url: ""
              client_name: ""
           }
        },
        {
           testimonial_heading: ""
           testimonial_paragraph: ""
           testimonial_client: {
              client_company: ""
              client_img_id: ""
              client_img_url: ""
              client_name: ""
           }
        },
        {
           testimonial_heading: ""
           testimonial_paragraph: ""
           testimonial_client: {
              client_company: ""
              client_img_id: ""
              client_img_url: ""
              client_name: ""
           }
        },
        {
           testimonial_heading: ""
           testimonial_paragraph: ""
           testimonial_client: {
              client_company: ""
              client_img_id: ""
              client_img_url: ""
              client_name: ""
           }
        },
        {
           testimonial_heading: ""
           testimonial_paragraph: ""
           testimonial_client: {
              client_company: ""
              client_img_id: ""
              client_img_url: ""
              client_name: ""
           }
        },
        ]
     }
     footer: {
        footer_heading: ""
        footer_paragraph: ""
     }
  }) {
    __typename
    id
    email
    username
  }
}`;

    // Create the prompt for OpenAI with strict instructions about array structure and styling
    const prompt = `You are an expert at creating stunning, professional portfolio websites. I have a resume text that I want you to transform into an elegant, modern portfolio for the Arik template, which has a dark theme with gold/wheat accents.

Here's the resume text:
${resumeText}

Based on this resume, fill out the following GraphQL mutation template with captivating, professional content. Don't just copy the resume text verbatim - transform it into compelling portfolio content that follows these style guidelines:

1. HERO SECTION:
   - hero_heading: Create a powerful, concise professional title (e.g., "Web Developer & Designer" or "UX/UI Designer & Frontend Engineer") - keep it under 40 characters
   - hero_subheading: Write an impactful tagline that captures their unique value proposition (30-50 characters)
   - hero_paragraph: Craft an elegant, concise bio (2-3 sentences, 150-200 characters) that highlights their core strengths

2. SERVICES SECTION:
   - Focus on 3 core services they can offer based on their skills
   - Each description should be concise (60-80 characters) but impactful
   - Use professional, confident language that sells their expertise

3. WORK SECTION:
   - Transform their experience into portfolio projects
   - Create compelling project titles and appropriate categories
   - Leave img_url empty but fill in other fields

4. PROCESS SECTION:
   - process_heading: Create a client-focused heading about their work process
   - Each step should have a clear, concise heading and valuable content
   - step_points should be actionable, specific bullet points

5. TESTIMONIALS SECTION:
   - Create realistic-sounding testimonials based on their experience
   - Vary the tone and focus of each testimonial
   - Use professional language that highlights different aspects of their work

6. FOOTER SECTION:
   - Create a compelling call-to-action

CRITICALLY IMPORTANT: You MUST maintain the EXACT structure of all arrays in the template. Do not add or remove any array items. The backend requires arrays to have exactly the same number of items as shown in the template. For example:
- logos array MUST have exactly 6 items
- services array MUST have exactly 3 items
- work array MUST have exactly 4 items
- process.steps array MUST have exactly 5 items
- testimonials.testimonials array MUST have exactly 6 items

If you don't have enough content to fill all items in an array, just leave the remaining items with empty strings, but NEVER change the array structure.

Here's the template to fill out:
${schemaTemplate}

Very important: Return ONLY the filled GraphQL mutation as a valid GraphQL query string. Do not include any JSON formatting, markdown formatting, or any other text. The response should be a plain string that can be directly used as a GraphQL query.`;

    // Call OpenAI API
    const completion = await openAIClient.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional portfolio designer specializing in creating elegant, modern content for dark-themed portfolio websites. You transform resume content into compelling, concise portfolio sections while maintaining the exact structure of templates. Your content is sophisticated, professional, and tailored to showcase expertise in the most impressive way.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    // Extract the response
    const generatedQuery = completion.choices[0].message.content;
    console.log("Generated GraphQL query:", generatedQuery);

    // Return the generated query
    return NextResponse.json({
      success: true,
      generatedQuery,
    });
  } catch (error) {
    console.error("Error generating portfolio schema:", error);
    return NextResponse.json(
      { error: "Failed to generate portfolio schema" },
      { status: 500 }
    );
  }
}
