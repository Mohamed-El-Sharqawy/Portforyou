import fetcher from "@/services/api";

export const signin = async (user: { email: string; password: string }) => {
  const query = `
        mutation {
          login(input: {email: "${user.email}", password: "${user.password}"}) {
            token
          }
        }
      `;

  return await fetcher(query);
};
