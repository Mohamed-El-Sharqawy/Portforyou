import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import fs from "fs/promises";
import path from "path";
import os from "os"; // Import OS module for a cross-platform temp directory

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Maximum content length to send in a single request (in characters)
const MAX_CHUNK_SIZE = 12000; // Adjust based on your token limits

export async function POST(req: NextRequest) {
  try {
    // Parse the form data
    const formData = await req.formData();
    const file = formData.get("resume") as File | null;
    const chunkIndex = formData.get("chunkIndex") as string | null;
    const totalChunks = formData.get("totalChunks") as string | null;
    const fileId = formData.get("fileId") as string | null;
    const isLastChunk = formData.get("isLastChunk") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Get a valid temporary directory based on OS
    const tempDir = os.tmpdir(); // Uses OS-specific temp directory (Windows, Linux, macOS)
    
    // If this is a chunk upload
    if (fileId && chunkIndex !== null) {
      const chunkDir = path.join(tempDir, fileId);
      
      // Create directory for chunks if it doesn't exist
      try {
        await fs.mkdir(chunkDir, { recursive: true });
      } catch (error) {
        console.log("Directory already exists or couldn't be created", error);
      }
      
      // Save this chunk
      const chunkPath = path.join(chunkDir, `chunk-${chunkIndex}`);
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(chunkPath, fileBuffer);
      
      // If this is not the last chunk, just acknowledge receipt
      if (isLastChunk !== "true") {
        return NextResponse.json({
          success: true, 
          message: `Chunk ${chunkIndex} received` 
        });
      }
      
      // If this is the last chunk, process all chunks
      const numChunks = parseInt(totalChunks || "1");
      let fullContent = "";
      
      // Combine all chunks
      for (let i = 0; i < numChunks; i++) {
        const chunkPath = path.join(chunkDir, `chunk-${i}`);
        const chunkContent = await fs.readFile(chunkPath, "utf-8");
        fullContent += chunkContent;
      }
      
      // Generate a GraphQL schema using OpenAI
      const graphQLSchema = await processContentWithOpenAI(fullContent);
      
      // Clean up: Delete all chunk files
      for (let i = 0; i < numChunks; i++) {
        await fs.unlink(path.join(chunkDir, `chunk-${i}`)).catch(() => {});
      }
      
      // Try to remove the directory
      await fs.rmdir(chunkDir).catch(() => {});
      
      return NextResponse.json({ graphQLSchema });
    } 
    // If this is a regular single upload (backward compatibility)
    else {
      const filePath = path.join(tempDir, file.name);
      
      // Write the file to the temp directory
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(filePath, fileBuffer);
      
      // Read file content
      const fileContent = await fs.readFile(filePath, "utf-8");
      
      // Generate a GraphQL schema
      const graphQLSchema = await processContentWithOpenAI(fileContent);
      
      // Clean up: Delete the temporary file after processing
      await fs.unlink(filePath);
      
      return NextResponse.json({ graphQLSchema });
    }
  } catch (error) {
    console.error("Error processing upload:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to process content with OpenAI
async function processContentWithOpenAI(content: string): Promise<string> {
  try {
    // Split content into chunks if it's too large
    const chunks = splitIntoChunks(content, MAX_CHUNK_SIZE);
    const fullContent = chunks.join('\n\n');
    
    const templateStructure = `
mutation updateAllUserData($userId: ID!) {
  updateUserTemplate(id: $userId, template: {
     hero: {
        hero_heading: ""
        hero_subheading: ""
        hero_paragraph: ""
     }
     logos: [ {
        img_id: ""
        img_url: ""
     }]
     services: [ {
        description: ""
        title: ""
     }]
     work: [ {
        category: ""
        img_id: ""
        img_url: ""
        project_link: ""
        title: ""
     }]
     process: {
        process_heading: ""
        process_paragraph: ""
        steps: [ {
           step_heading: ""
           step_subheading: ""
           step_paragraph: ""
           step_points: ["", "", ""]
        }]
     }
     testimonials: {
        testimonials_heading: ""
        testimonials_paragraph: ""
        testimonials: [ {
           testimonial_heading: ""
           testimonial_paragraph: ""
           testimonial_client: {
              client_company: ""
              client_img_id: ""
              client_img_url: ""
              client_name: ""
           }
        }]
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

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: `Analyze the following resume content and extract relevant information to fill in the GraphQL template. Fill in the fields that apply to the resume content, and leave fields empty if they don't apply (keep the empty quotes). Return the complete GraphQL mutation with the filled template:\n\n${fullContent}\n\nTemplate to fill:\n${templateStructure}. and don't reply with here's the content or based on the content provided or anything like that just give me the schema directly.` }],
      temperature: 0.7,
    });
    
    const graphQLSchema = response.choices[0].message.content?.trim() || "";
    
    return graphQLSchema;
  } catch (error) {
    console.error("Error processing with OpenAI:", error);
    throw error;
  }
}

// Helper function to split text into chunks
function splitIntoChunks(text: string, maxChunkSize: number): string[] {
  const chunks: string[] = [];
  let currentChunk = "";
  
  // Split by paragraphs to maintain some context
  const paragraphs = text.split(/\n\s*\n/);
  
  for (const paragraph of paragraphs) {
    // If adding this paragraph would exceed the chunk size, start a new chunk
    if (currentChunk.length + paragraph.length > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk);
      currentChunk = paragraph;
    } else {
      currentChunk += (currentChunk ? "\n\n" : "") + paragraph;
    }
  }
  
  // Add the last chunk if it's not empty
  if (currentChunk) {
    chunks.push(currentChunk);
  }
  
  return chunks;
}
