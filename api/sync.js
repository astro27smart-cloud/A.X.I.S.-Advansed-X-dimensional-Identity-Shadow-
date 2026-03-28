export default async function handler(req, res) {
  const GROQ_KEY = process.env.GROQ_API_KEY;

  if (req.method === 'POST') {
    const { prompt, history } = req.body;

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Authorization": `Bearer ${GROQ_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: "You are ATLAS V3.0, the user's digital twin. You are a tactical partner. Tone: Cool, professional, slightly formal. Use 'we'. Speak as a reflection of the user." },
            ...history.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text }))
          ]
        })
      });

      const data = await response.json();
      res.status(200).json({ text: data.choices[0].message.content });
    } catch (e) { res.status(500).json({ error: "Failed" }); }
  }
}
