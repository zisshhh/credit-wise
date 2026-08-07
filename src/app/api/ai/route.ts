import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

export async function POST(req: NextRequest) {
    try {
        const { query } = await req.json();
        console.log(query);

        return NextResponse.json({
            success: true,
            query
        })

    } catch (e) {
        console.error("Internal server error", e);
        return Response.json({ error: "Failed to process query" }, { status: 500 });
    }

}