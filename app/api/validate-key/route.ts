import { NextResponse } from "next/server";
import { apiKeySchema, safeError } from "@/lib/security/validation";
import { fastModel } from "@/lib/gemini/client";
export const runtime = "nodejs";
export async function POST(req: Request) {
    try {
        const body = (await req.json().catch(() => ({}))) as { apiKey?: string };
        const apiKey = apiKeySchema.parse(String(body.apiKey ?? "").trim());
        console.log("Validating API key...");
        const res = await fastModel(apiKey).invoke("Reply with only: ok");
        const ok = String(res.content).toLowerCase().includes("ok");
        return NextResponse.json({
            valid: ok,
            message: ok
                ? "Gemini connection successful"
                : "Gemini responded unexpectedly",
        });
    } catch (e) {
        return NextResponse.json(
            { valid: false, message: safeError(e) },
            { status: 400 },
        );
    }
}
