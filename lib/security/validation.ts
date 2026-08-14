import {z} from 'zod';import {ragConfig} from '@/lib/rag/config';
export const apiKeySchema=z.string().min(20).max(256).regex(/^[A-Za-z0-9_\-]+$/,'Invalid API key format');
export const chatSchema=z.object({question:z.string().min(1).max(ragConfig.maxQuestionChars),apiKey:apiKeySchema,history:z.array(z.object({role:z.enum(['user','assistant']),content:z.string().max(4000)})).max(12).default([]),settings:z.object({upperThreshold:z.number().min(0).max(1).optional(),lowerThreshold:z.number().min(0).max(1).optional()}).optional()});
export const doubtSchema=z.object({apiKey:apiKeySchema,doubt:z.string().min(1).max(1000),question:z.string().max(1200),answer:z.string().max(8000),trace:z.unknown()});
export function safeError(error:unknown){const msg=error instanceof Error?error.message:'Unexpected error';if(/api key|password|secret/i.test(msg))return 'The model provider rejected the request. Check your key and quota.';return msg.slice(0,220)}
