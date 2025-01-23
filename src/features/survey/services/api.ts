import fetcher from "@/services/api";

export const getUserPreferences = async (id: string) => {
  const query = `
    query UserPreferences {
      user(id: "${id}") {
        preferences {
          colors
          profession
        }
      }
    }
  `;

  return await fetcher(query);
};

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
