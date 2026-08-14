import type {RagChunk} from '@/types/rag';
const chunks:RagChunk[]=[
{id:'b1-1',type:'internal',source:'Book 1',page:12,content:'Gradient descent is an optimization algorithm used to minimize a loss function by iteratively moving parameters in the direction of the negative gradient. Learning rate controls the step size and affects convergence.'},
{id:'b1-2',type:'internal',source:'Book 1',page:33,content:'Supervised learning uses labeled examples to learn a mapping from inputs to outputs. Unsupervised learning discovers structure in unlabeled data, such as clusters or lower dimensional representations.'},
{id:'b1-3',type:'internal',source:'Book 1',page:51,content:'Overfitting occurs when a model captures noise or idiosyncrasies in training data and fails to generalize. Validation data, regularization, simpler models, and more data can reduce overfitting.'},
{id:'b2-1',type:'internal',source:'Book 2',page:67,content:'Regularization adds constraints or penalties to model training to discourage overly complex functions. L1 and L2 regularization are common techniques for controlling variance.'},
{id:'b2-2',type:'internal',source:'Book 2',page:95,content:'A neural network is a layered function approximator composed of neurons, weights, biases, and nonlinear activations. Training adjusts weights with backpropagation and optimization.'},
{id:'b3-1',type:'internal',source:'Book 3',page:121,content:'Reinforcement learning studies agents that choose actions in an environment to maximize cumulative reward. It uses concepts such as policy, value function, exploration, and exploitation.'},
{id:'b3-2',type:'internal',source:'Book 3',page:155,content:'Retrieval augmented generation retrieves external knowledge and supplies it to a language model. Poor retrieval can lead to unsupported answers even when the generator is capable.'},
{id:'b3-3',type:'internal',source:'Book 3',page:166,content:'Corrective RAG evaluates retrieved documents before generation. If retrieval is correct it refines context; if incorrect it rewrites the query and searches external sources; if ambiguous it combines internal and web evidence.'}
];
function terms(s:string){return new Set(s.toLowerCase().replace(/[^a-z0-9 ]/g,' ').split(/\s+/).filter(w=>w.length>2))}
export async function retrieve(question:string,topK=4):Promise<RagChunk[]>{const q=terms(question);return chunks.map(c=>{const t=terms(c.content+' '+c.source);let overlap=0;q.forEach(w=>{if(t.has(w))overlap++});return {...c,score:overlap/Math.max(q.size,1)}}).sort((a,b)=>(b.score??0)-(a.score??0)).slice(0,topK)}
export function allKnowledge(){return chunks}
