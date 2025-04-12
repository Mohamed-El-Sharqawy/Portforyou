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

    // Create the prompt for OpenAI with strict instructions about array structure
    const prompt = `You are an expert at creating professional portfolios. I have a resume text that I want you to analyze and use to fill out a GraphQL mutation template for a portfolio website.

Here's the resume text:
${resumeText}

Based on this resume, fill out the following GraphQL mutation template with appropriate values. Be creative but professional, and make sure the content reflects the person's skills, experience, and achievements from the resume.

CRITICALLY IMPORTANT: You MUST maintain the EXACT structure of all arrays in the template. Do not add or remove any array items. The backend requires arrays to have exactly the same number of items as shown in the template. For example:
- logos array MUST have exactly 6 items
- services array MUST have exactly 3 items
- work array MUST have exactly 4 items
- process.steps array MUST have exactly 5 items
- testimonials.testimonials array MUST have exactly 6 items
- don't put example.com in any src, just leave it empty if the text is not detailed enough

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
            "You are a professional portfolio generator assistant. You generate GraphQL queries based on resume content. You MUST maintain the exact structure of arrays in templates, never adding or removing array items, even if some items remain empty.",
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
