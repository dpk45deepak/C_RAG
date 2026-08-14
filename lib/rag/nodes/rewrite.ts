export async function rewriteQuery(question:string){return question.toLowerCase().replace(/[^a-z0-9 ]/g,' ').split(/\s+/).filter(w=>w.length>2).slice(0,12).join(' ')||question}
