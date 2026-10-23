
import express from "express";
import OpenAI from "openai";
import "dotenv/config";

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("Mera AI Tool server is running!");
});

app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({
        error: "Message likho"
      });
    }

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: message
    });

    res.json({
      reply: response.output_text
    });
  } catch (error) {
    console.error("AI request failed");
    res.status(500).json({
      error: "AI se jawab nahi mil paya. Dobara try karo."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
