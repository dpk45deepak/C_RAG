# Corrective RAG AI Assistant

A production-ready Next.js application that turns the CampusX Corrective RAG notebook flow into an interactive web app: retrieve, evaluate, route, correct, refine, generate, and inspect every step.

## Architecture

```text
START → retrieve → evaluate_retrieval → route
CORRECT   → refine_context → generate_answer
INCORRECT → rewrite_query → web_search → refine_context → generate_answer
AMBIGUOUS → rewrite_query → web_search → combine_internal_and_web_context → refine_context → generate_answer → END
```

The app uses Next.js App Router, TypeScript, Tailwind, shadcn-style primitives, Framer Motion, React Markdown, LangChain Google Gemini, LangGraph, Zod, and an optional Tavily web-search provider. The repository currently packages a lightweight Vercel-compatible internal knowledge base derived from the three original ML book PDFs so deployment does not need FAISS, Python, Docker, or a persistent filesystem.

## Corrective RAG

Normal RAG retrieves context and generates. If retrieval is poor, generation receives bad context. Corrective RAG evaluates retrieved chunks first:

- `CORRECT`: refine internal context and generate.
- `INCORRECT`: rewrite the query, optionally search the web, refine evidence, generate.
- `AMBIGUOUS`: combine useful internal evidence with optional web evidence, refine, generate.

## Features

- Gemini API key setup and validation in the UI.
- Streaming chat responses through server-sent events.
- RAG trace observability panel with retrieval scores, verdict, correction path, refinement stats, source cards, and LLMOps metrics.
- Doubt Assistant that answers over the current answer and trace without rerunning the full RAG pipeline.
- Learn, Architecture, Settings, and Analytics pages.
- Optional Tavily fallback behind a provider abstraction.
- Prompt-injection defense in generation/refinement prompts.
- Local cost estimates; no telemetry is sent to third parties.

## Folder Structure

- `app/` — pages and API route handlers.
- `components/` — chat, trace, sources, doubt assistant, layout, UI.
- `lib/rag/` — LangGraph graph, state, nodes, prompts, retriever, config.
- `lib/gemini/` — centralized Gemini model factories.
- `lib/web-search/` — web-search provider abstraction.
- `lib/metrics/` — token and cost estimation.
- `lib/security/` — Zod schemas and safe errors.
- `types/` — shared TypeScript types.
- `test/` — Vitest coverage for retrieval, routing, validation, metrics, and prompt injection.

## Environment Variables

Copy `.env.example` if you want custom models or web search:

```bash
cp .env.example .env.local
```

`GEMINI_API_KEY` is intentionally not required in production. Users paste their own Gemini key into the UI for the current session.

Optional:

- `GEMINI_MODEL=gemini-1.5-pro`
- `GEMINI_FAST_MODEL=gemini-1.5-flash`
- `GEMINI_EMBEDDING_MODEL=text-embedding-004`
- Tavily API key: enter it in the chat UI when you want optional web fallback for the current session.

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`, go to `/chat`, enter a Gemini API key, validate it, and start asking questions.

## Testing and Build

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Vercel Deployment

Deploy as a standard Next.js project. API routes use the Node.js runtime for LangChain/LangGraph compatibility. No persistent filesystem writes, local FAISS index, Python service, Redis, Docker, or database is required. Users can enter a Tavily API key in the chat UI when they want web fallback; no shared server-side Tavily key is required.

## LLMOps and Cost

Corrective RAG may use more LLM calls than normal RAG because it evaluates retrieval and conditionally rewrites/searches/refines. The app uses cheaper Gemini configuration for control-plane tasks and a stronger model for final generation. Metrics are estimates when provider token metadata is unavailable.

## Security

- No hardcoded Gemini key.
- API key is not stored in a database or localStorage.
- Input is validated with Zod.
- Prompt injection defenses treat retrieved and web text as untrusted evidence.
- Server errors are sanitized to avoid exposing secrets or stack traces.

## Limitations and Future Improvements

The packaged retriever is stateless and Vercel-safe. Future production upgrades can add precomputed Gemini embeddings or a managed vector database without changing the graph interface. Browser-side chat history is session-oriented rather than database-backed by design.
