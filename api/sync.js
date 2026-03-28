import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // This looks for the key you will set in Vercel later
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "You are ASKAI V3.0, the user's digital twin. Vibe: Cool, professional, slightly formal. You are a tactical partner. Never mention you are an AI. Use 'we' and 'our'. Be concise."
  });

  if (req.method === 'POST') {
    try {
      const { prompt } = req.body;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      res.status(200).json({ text: response.text() });
    } catch (error) {
      res.status(500).json({ error: "Neural Link Interrupted." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
