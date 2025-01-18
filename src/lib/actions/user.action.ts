export const createUser = async (user: {
  email: string;
  username: string | null;
  clerkId: string;
}) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  const mutation = `
    mutation {
      register(input: {email: "${user.email}", username: "${user.username}", clerkId: "${user.clerkId}"}) {
        token
        user {
          id
        }
      }
    }
  `;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: mutation,
      }),
    });
    return response.json();
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
