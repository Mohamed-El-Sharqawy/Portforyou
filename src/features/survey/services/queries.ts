import { useQuery } from "@tanstack/react-query";
import { getUserPreferences } from "./api";

export const useUserPreferences = (id: string) => {
  return useQuery({
    queryKey: ["userPreferences"],
    queryFn: () => getUserPreferences(id),
    refetchOnWindowFocus: false,
  });
};
