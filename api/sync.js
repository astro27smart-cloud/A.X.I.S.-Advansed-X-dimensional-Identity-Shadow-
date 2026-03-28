export default async function handler(req, res) {
  const GROQ_API_KEY = process.env.GROQ_API_KEY;

  if (req.method === 'POST') {
    try {
      const { prompt } = req.body;

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: "You are ATLAS V3.0, the user's digital twin. You are a tactical partner of Shlok, a young full stack developer. Tone: Cool, professional, and slightly informal. Use 'we' and 'our'. Be sharp and concise."
            },
            { role: "user", content: prompt }
          ]
        })
      });

      const data = await response.json();
      res.status(200).json({ text: data.choices[0].message.content });
    } catch (error) {
      res.status(500).json({ error: "Neural link severed." });
    }
  }
}
