import OpenAi from "openai";

class OpenAIClient {
  private static instance: OpenAIClient | null = null;
  private client: OpenAi;

  private constructor() {
    this.client = new OpenAi({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  public static getInstance(): OpenAIClient {
    if (!OpenAIClient.instance) {
      OpenAIClient.instance = new OpenAIClient();
    }
    return OpenAIClient.instance;
  }

  public getClient(): OpenAi {
    return this.client;
  }
}

export const openAIClient = OpenAIClient.getInstance().getClient();
