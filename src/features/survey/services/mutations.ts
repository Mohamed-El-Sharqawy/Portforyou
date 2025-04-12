import { useMutation } from "@tanstack/react-query";
import { updateUserArikTemplate } from "./api";

export const useUpdateUserArikTemplate = () => {
  return useMutation({
    mutationFn: (query: string) => updateUserArikTemplate(query),
  });
};
