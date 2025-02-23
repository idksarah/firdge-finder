const API_KEY = import.meta.env.VITE_API_KEY;

export async function GPTQuestion (prompt: string) {
    const response = await fetch ("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${API_KEY}`, 
      "Content-Type": "application/json"},
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant designed to output JSON. DO NOT USE TRIPLE BACKTICKS"
          },
          {
            role: "user",
            content:
            `Answer this question under 30 words: ${prompt}.
            The response must be JSON in the format:
            {
              answer: string
            }`
          }
        ],
      }),
    });
    const data = await response.json();
    const assistantMessage = data.choices[0]?.message.content;
    return JSON.parse(assistantMessage);
  }