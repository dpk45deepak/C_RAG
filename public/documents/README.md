# Knowledge base documents

The source CampusX notebooks reference `documents/book1.pdf`, `documents/book2.pdf`, and `documents/book3.pdf`. This Vercel-ready implementation packages normalized seed chunks in `lib/rag/retriever/index.ts` so serverless requests do not parse PDFs or depend on local FAISS persistence. Future upload support can add a managed vector store behind the same retriever interface.
