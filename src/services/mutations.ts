import { useMutation } from "@tanstack/react-query";
import openai_fetcher from "./openai";

export const useOpenAIMutation = () => {
  return useMutation({
    mutationFn: (content: string) => openai_fetcher(content),
    onError: (error) => {
      console.error("Error in OpenAI mutation:", error);
    },
  });
};
