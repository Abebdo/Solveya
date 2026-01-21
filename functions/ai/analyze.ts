import { Ai } from '@cloudflare/ai';

export const onRequestPost = async (context) => {
  try {
    const { request, env } = context;

    const { message } = await request.json();

    if (!message || message.trim().length < 3) {
      return new Response(
        JSON.stringify({ error: "Message is too short or missing." }),
        { status: 400 }
      );
    }

    const ai = new Ai(env);

    const prompt = `
You are a Scam Detection AI.
Analyze the message below and return:

- Scam risk score (0-100)
- Explanation
- Suspicious keywords
- Scam type (if applicable)
- Recommendation for user

Message:
"${message}"

Return the result in pure JSON without extra text.
`;

    const response = await ai.run(
      "@cf/meta/llama-3-8b-instruct",
      {
        prompt,
        max_tokens: 300,
        temperature: 0.2
      }
    );

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
};
