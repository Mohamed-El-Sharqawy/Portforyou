import cookie from "js-cookie";

const BASE_URL: string = process.env.NEXT_PUBLIC_API_URL!;

export const fetcher = async (query: string) => {
  try {
    const token = cookie.get("token");

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
      }),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export default fetcher;
