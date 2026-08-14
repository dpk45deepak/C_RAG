import './globals.css';import type {Metadata} from 'next';
export const metadata:Metadata={title:'Corrective RAG AI Assistant',description:"Don't just retrieve. Evaluate. Correct. Generate."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
