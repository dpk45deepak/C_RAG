import {ChatGoogleGenerativeAI} from '@langchain/google-genai';import {ragConfig} from '@/lib/rag/config';
export function fastModel(apiKey:string){return new ChatGoogleGenerativeAI({apiKey,model:ragConfig.fastModel,temperature:0.1})}
export function strongModel(apiKey:string,streaming=false){return new ChatGoogleGenerativeAI({apiKey,model:ragConfig.strongModel,temperature:0.25,streaming})}
