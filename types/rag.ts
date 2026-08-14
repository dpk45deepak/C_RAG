export type Verdict='CORRECT'|'INCORRECT'|'AMBIGUOUS';export type SourceType='internal'|'web';
export interface RagChunk{id:string;content:string;source:string;page?:number;score?:number;type:SourceType;url?:string;title?:string}
export interface Evaluation{chunkId:string;score:number;reason:string}
export interface WebResult{title:string;url:string;content:string;domain:string}
export interface RagMetrics{totalLatencyMs:number;retrievalLatencyMs:number;evaluationLatencyMs:number;refinementLatencyMs:number;webSearchLatencyMs:number;generationLatencyMs:number;llmCalls:number;embeddingCalls:number;webSearches:number;promptTokens:number;completionTokens:number;totalTokens:number;estimatedCostUsd:number;estimated:boolean;retrievalCount:number;relevantDocumentCount:number;correctionCount:number;finalAnswerLength:number}
export interface RagTrace{question:string;retrieved:RagChunk[];evaluations:Evaluation[];verdict:Verdict;rewrittenQuery?:string;webSearchUsed:boolean;webResults:WebResult[];refinedContext:string;originalContextChars:number;refinedContextChars:number;retainedSentences:number;metrics:RagMetrics;events:string[];warning?:string}
export interface RagResponse{answer:string;trace:RagTrace;sources:RagChunk[]}
