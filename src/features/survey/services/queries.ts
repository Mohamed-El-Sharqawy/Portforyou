import { useQuery } from "@tanstack/react-query";
import { getUserPreferences } from "./api";

export const useUserPreferences = () => {
  return useQuery({
    queryKey: ["userPreferences"],
    queryFn: getUserPreferences,
    refetchOnWindowFocus: false,
  });
};
