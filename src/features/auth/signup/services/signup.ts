import fetcher from "@/services/api";

export const signup = async (user: {
  email: string;
  username: string | null;
  password: string;
}) => {
  const query = `
    mutation {
      register(input: {email: "${user.email}", username: "${user.username}", password: "${user.password}"}) {
        token
        user {
          id
          email
          username
          subscription
        }
      }
    }
  `;

  return await fetcher(query);
};
