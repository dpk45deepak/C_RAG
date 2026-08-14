import {NextResponse} from 'next/server';export function GET(){return NextResponse.json({ok:true,service:'corrective-rag',time:new Date().toISOString()})}
