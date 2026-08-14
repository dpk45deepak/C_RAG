import type {RagTrace,RagChunk} from './rag';export interface ChatMessage{id:string;role:'user'|'assistant';content:string;trace?:RagTrace;sources?:RagChunk[];createdAt:number}
