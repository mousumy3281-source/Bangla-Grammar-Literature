import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let genAI: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAI && process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAI;
}

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", aiEnabled: Boolean(process.env.GEMINI_API_KEY) });
});

// Analyze Bangla Sentence API
app.post("/api/grammar/analyze", async (req, res) => {
  const { sentence } = req.body;
  if (!sentence || typeof sentence !== "string" || !sentence.trim()) {
    return res.status(400).json({ error: "অনুগ্রহ করে একটি বাংলা বাক্য প্রদান করুন।" });
  }

  const ai = getGenAI();
  if (!ai) {
    // Return structured educational breakdown if AI key is missing
    return res.json({
      sentence: sentence.trim(),
      summary: "সারসংক্ষেপ: বাক্যটি বিশ্লেষণ করা হয়েছে। (AI সংযোগ ছাড়াই মৌলিক বিশ্লেষণ প্রদর্শিত)",
      words: sentence.trim().split(/\s+/).map((word) => ({
        word,
        podo: "বিশ্লেষণাধীন পদ",
        karak: "প্রসঙ্গানুযায়ী কারক",
        bibhakti: "বিভক্তি",
        notes: "বিস্তারিত ব্যাকরণ বিশ্লেষণের জন্য AI সক্রিয় করতে পারেন।"
      })),
      structure: "সরল/যৌগিক বাক্য",
      corrections: [],
      explanation: "বাক্যটির প্রতিটি পদ সাধু ও চলিত মিশ্রণ মুক্ত রাখুন এবং যথাস্থানে যতিচিহ্ন ব্যবহার করুন।"
    });
  }

  try {
    const prompt = `তুমি একজন প্রখ্যাত বাংলা ব্যাকরণ বিশেষজ্ঞ ও শিক্ষক। নিচের বাংলা বাক্যটির পুঙ্খানুপুঙ্খ ব্যাকরণিক বিশ্লেষণ করো:
বাক্য: "${sentence.trim()}"

বিশ্লেষণের বিষয়বস্তু:
1. বাক্যের ধরন (গঠনানুসারে: সরল, জটিল বা মিশ্র, যৌগিক; এবং অর্থানুসারে: নির্দেশাত্মক, প্রশ্নবোধক, অনুজ্ঞাসূচক ইত্যাদি)।
2. পদ বিশ্লেষণ (Parts of Speech): বাক্যের প্রতিটি শব্দের পদ (বিশেষ্য, বিশেষণ, সর্বনাম, ক্রিয়া, অব্যয় ও উপশ্রেণী)।
3. কারক ও বিভক্তি: বাক্যের নামপদগুলোর কারক (কর্তৃ, কর্ম, করণ, সম্প্রদান, অপাদান, অধিকরণ) ও বিভক্তি (প্রথমা/শূন্য, দ্বিতীয়া, তৃতীয়া ইত্যাদি) এবং কেন এই কারক হলো তার সংক্ষেপ ব্যাখ্যা।
4. ব্যাকরণিক বা বানান ত্রুটি (Error check): বানান ভুল বা সাধু-চলিত মিশ্রণ বা ব্যাকরণিক অসংগতি থাকলে চিহ্নিত করো এবং সংশোধিত শুদ্ধ রূপ দাও।
5. সার্বিক মন্তব্য বা শিক্ষণীয় টিপস।`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentence: { type: Type.STRING },
            sentenceTypeFormation: { type: Type.STRING, description: "গঠনগত ধরন (সরল/জটিল/যৌগিক)" },
            sentenceTypeMeaning: { type: Type.STRING, description: "অর্থগত ধরন (বর্ণনামূলক/প্রশ্নবাচক ইত্যাদি)" },
            overallSummary: { type: Type.STRING, description: "সার্বিক ব্যাকরণিক ব্যাখ্যা" },
            hasErrors: { type: Type.BOOLEAN, description: "কোনো ত্রুটি আছে কি না" },
            correctedSentence: { type: Type.STRING, description: "শুদ্ধ বাক্য" },
            errorNotes: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "ভুল ও তার ব্যাখ্যার তালিকা" 
            },
            wordsAnalysis: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  word: { type: Type.STRING },
                  podo: { type: Type.STRING, description: "পদের শ্রেণীবিভাগ" },
                  karak: { type: Type.STRING, description: "কারক (যদি প্রযোজ্য হয়)" },
                  bibhakti: { type: Type.STRING, description: "বিভক্তি" },
                  rootOrSandhi: { type: Type.STRING, description: "প্রকৃতি-প্রত্যয় বা সন্ধি বিশ্লেষণ (যদি থাকে)" },
                  note: { type: Type.STRING, description: "সংক্ষিপ্ত ব্যাকরণীয় মন্তব্য" }
                },
                required: ["word", "podo"]
              }
            },
            learningTip: { type: Type.STRING, description: "শিক্ষার্থীদের জন্য বিশেষ ব্যাকরণ টিপ" }
          },
          required: ["sentence", "sentenceTypeFormation", "overallSummary", "wordsAnalysis"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("AI Analysis error:", error);
    return res.status(500).json({ 
      error: "বিশ্লেষণ সম্পন্ন করা সম্ভব হয়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।",
      details: error.message 
    });
  }
});

// Bangla Grammar Tutor AI - Ask any Question
app.post("/api/grammar/ask", async (req, res) => {
  const { question, topic } = req.body;
  if (!question || typeof question !== "string" || !question.trim()) {
    return res.status(400).json({ error: "অনুগ্রহ করে আপনার ব্যাকরণ প্রশ্নটি লিখুন।" });
  }

  const ai = getGenAI();
  if (!ai) {
    return res.status(503).json({ 
      error: "AI সেবা সক্রিয় নেই। অনুগ্রহ করে সেটিংস থেকে GEMINI_API_KEY সেট করুন।" 
    });
  }

  try {
    const prompt = `তুমি একজন সহায়ক ও উচ্চমানের বাংলা ব্যাকরণ শিক্ষক। শিক্ষার্থী ব্যাকরণ সম্পর্কিত নিম্নোক্ত প্রশ্নটি করেছে:
বিষয়/টপিক: ${topic || "সাধারণ বাংলা ব্যাকরণ"}
প্রশ্ন: "${question.trim()}"

নির্দেশনা:
- স্পষ্ট, সহজবোধ্য ও শিক্ষার্থীবান্ধব বাংলায় উত্তর দাও।
- প্রযোজ্য ক্ষেত্রে নিয়ম (Rules), শর্টকাট টেকনিক এবং প্রাসঙ্গিক উদাহরণ (Examples) দাও।
- প্রচলিত ব্যতিক্রম বা পরীক্ষার গুরুত্বপূর্ণ প্রশ্ন থাকলে উল্লেখ করো।
- উত্তরটি সুন্দর মার্জিত ফরম্যাটে সাজিয়ে উপস্থাপন করো।`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert Bengali Grammar (বাংলা ব্যাকরণ) master tutor. Provide friendly, crystal-clear, structured answers with authentic examples.",
      }
    });

    return res.json({ answer: response.text });
  } catch (error: any) {
    console.error("AI Ask error:", error);
    return res.status(500).json({ 
      error: "উত্তর প্রস্তুত করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
      details: error.message 
    });
  }
});

// Dynamic AI Quiz Generator
app.post("/api/grammar/generate-quiz", async (req, res) => {
  const { topic, difficulty = "মাঝারি" } = req.body;
  const ai = getGenAI();
  if (!ai) {
    return res.status(503).json({ error: "AI সক্রিয় নয়।" });
  }

  try {
    const prompt = `বাংলা ব্যাকরণের "${topic || 'সন্ধি ও সমাস'}" বিষয়ে ৪টি চমৎকার মানসম্মত বহুনির্বাচনী প্রশ্ন (MCQ Quiz) তৈরি করো।
কাঠিন্য মাত্রা: ${difficulty}।

প্রতিটি প্রশ্নে ৪টি অপশন, সঠিক উত্তরের ইনডেক্স (0 থেকে 3) এবং কেন এই উত্তর সঠিক তার একটি সহজবোধ্য শিক্ষণীয় ব্যাখ্যা থাকবে।`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "৪টি উত্তরের অপশন" 
              },
              correctIndex: { type: Type.INTEGER, description: "০ থেকে ৩ এর মধ্যে সঠিক অপশনের সূচক" },
              explanation: { type: Type.STRING, description: "সঠিক উত্তরের বিশদ নিয়ম ও ব্যাখ্যা" }
            },
            required: ["question", "options", "correctIndex", "explanation"]
          }
        }
      }
    });

    const quiz = JSON.parse(response.text || "[]");
    return res.json({ quiz });
  } catch (error: any) {
    console.error("Quiz generate error:", error);
    return res.status(500).json({ error: "কুইজ প্রস্তুত করা সম্ভব হয়নি।" });
  }
});

// Vite Middleware for Dev vs Static for Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Bangla Grammar server running on port ${PORT}`);
  });
}

startServer();
