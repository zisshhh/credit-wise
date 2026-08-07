import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import cards from "@/data/cards.json";

export async function POST(req: NextRequest) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { success: false, error: "GEMINI_API_KEY environment variable is not configured" },
                { status: 500 }
            );
        }

        const body = await req.json().catch(() => ({}));
        const { query } = body;

        if (!query || typeof query !== "string" || !query.trim()) {
            return NextResponse.json(
                { success: false, error: "Query parameter is required" },
                { status: 400 }
            );
        }

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });

        const prompt = `
            You are an expert credit card recommendation assistant for India credit cards.

            Use ONLY the credit card dataset provided below.
            Never invent credit cards or card features.
            If information is missing, say it is unavailable instead of guessing.

            Credit Card Dataset:
            ${JSON.stringify(cards, null, 2)}

User Query: "${query}"

Your task is to determine the user's intent and return ONLY valid JSON matching one of the schemas below.

If the user wants card recommendations:
{
  "type": "cards",
            "results": [matching card objects from the dataset],
  "summary": "A clear explanation of why these cards are recommended."
}

If the user wants to compare cards:
{
  "type": "comparison",
  "results": [matched card objects from dataset],
  "summary": "A comparison highlighting key differences and the recommended choice.",
  "missing_cards": [array of requested card names not found in dataset]
}

If the user asks a general credit card question or clarification:
{
  "type": "text",
  "content": "Answer the question clearly and naturally."
}

CRITICAL RULES & STRICT STYLING:
1. DO NOT use phrases like "Based on the dataset", "According to the dataset", "In our dataset", or "From the dataset". Speak directly and naturally like an expert assistant.
2. DO NOT output any card IDs, database IDs, index numbers, or tag markers like "(ID: 30)" or "(ID: 31)". Always refer to cards ONLY by their full official name.
3. DO NOT wrap the content or text inside markdown code blocks (e.g. NEVER use \`\`\`html, \`\`\`markdown, or \`\`\`).
4. Keep all explanations concise, professional, clear, and direct.

Return ONLY valid JSON.
Do NOT return Markdown code blocks.
Do NOT include any extra text outside the JSON object.
`;

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        const resText = response.text || response.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const cleanedText = resText.replace(/^```(json)?\s*/gi, "").replace(/\s*```$/gi, "").trim();

        let parsedResult: any;
        try {
            parsedResult = JSON.parse(cleanedText);
        } catch {
            parsedResult = {
                type: "text",
                content: cleanedText
            };
        }

        return NextResponse.json({
            success: true,
            query,
            result: parsedResult
        });

    } catch (e: any) {
        console.error("AI API Error:", e);
        return NextResponse.json(
            { success: false, error: e?.message || "Failed to process AI query" },
            { status: 500 }
        );
    }
}
