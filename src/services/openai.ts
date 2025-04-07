const openai_fetcher = async (content: string) => {
  try {
    const res = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        name: "Anonymous",
      }),
    });
    const data = await res.json();
    const openai_content = await data.choices[0].message.content;

    return openai_content;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error so it can be caught by the mutation
  }
};

export default openai_fetcher;
