export const ragConfig = {
    topK: 4,
    maxWebResults: 5,
    maxSentences: 28,
    maxContextChars: 12000,
    maxQuestionChars: 1200,
    maxCorrections: 1,
    upperThreshold: Number(process.env.RAG_UPPER_THRESHOLD ?? 0.7),
    lowerThreshold: Number(process.env.RAG_LOWER_THRESHOLD ?? 0.3),
    fastModel: process.env.GEMINI_FAST_MODEL ?? "gemini-3.6-flash",
    strongModel: process.env.GEMINI_MODEL ?? "gemini-3.6-flash",
    embeddingModel: process.env.GEMINI_EMBEDDING_MODEL ?? "gemini-embedding-001",
};


export const pricePerMillion: {
    [k: string]: { input: number; output: number };
} = {
    "gemini-3.6-flash": { input: 0.35, output: 1.05 },
    "gemini-3.6-pro": { input: 3.5, output: 10.5 },
};
