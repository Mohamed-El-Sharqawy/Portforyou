export const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/upload-auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(
      `Authentication request failed: ${(error as { message: string }).message}`
    );
  }
};
