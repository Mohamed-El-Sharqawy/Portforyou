import { getToken } from "@/lib/utils";
import fetcher from "@/services/api";

// Queries
export const getUserPreferences = async () => {
  const {
    decodedToken: { userId },
  } = getToken();

  const query = `
    query UserPreferences {
      user(id: "${userId}") {
        preferences {
          colors
          profession
          email
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
  email: string;
}) => {
  const query = `
    mutation UserPreferences {
      updateUserPreferences(id: "${user.userId}", preferences: {
        colors: [${user.colors.map((color) => `"${color}"`)}]
        profession: "${user.profession}"
        email: "${user.email}"
      }) {
        id
        email
        username
        preferences {
          colors
          profession
        }
      }
    }
  `;

  return await fetcher(query);
};
