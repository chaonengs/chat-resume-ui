import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { VectorIndexBody } from '@/types/chat';

const handler = async (req: Request): Promise<Response> => {
const { query, context, vector } = (await req.json()) as VectorIndexBody;
 

  // Create docs with a loader
//   const loader = new TextLoader(
//     "src/document_loaders/example_data/example.txt"
//   );
//   const docs = await loader.load();

  // Load the docs into the vector store
  const vectorStore = await MemoryVectorStore.fromDocuments(
    requestBody.query,
    new OpenAIEmbeddings()
  );

  // Search for the most similar document
  const resultOne = await vectorStore.similaritySearch("hello world", 1);

  console.log(resultOne);

  return new Response(String(resultOne), { status: 200 });
};

export default handler;