import { getToken } from "@/lib/utils";
import fetcher from "@/services/api";

// Queries
export const getUserPreferences = async () => {
  const {decodedToken: {userId} } = getToken();

  const query = `
    query UserPreferences {
      user(id: "${userId}") {
        preferences {
          colors
          profession
        }
      }
    }
  `;

  return await fetcher(query);
};

// Mutations
export const updatePreferences = async (user: {
  userId: string;
  colors: string[];
  profession: string;
}) => {
  const query = `
    mutation UserPreferences {
      updateUserPreferences(id: "${user.userId}", preferences: {
        colors: [${user.colors.map((color) => `"${color}"`)}]
        profession: "${user.profession}"
      }) {
        id
        email
        username
      }
    }
  `;

  return await fetcher(query);
};
