// import { DEFAULT_SYSTEM_PROMPT, DEFAULT_TEMPERATURE } from '@/utils/app/const';
// import { OpenAIError, OpenAIStream } from '@/utils/server';

// import { ChatBody, Message } from '@/types/chat';

// // @ts-expect-error
// import wasm from '../../node_modules/@dqbd/tiktoken/lite/tiktoken_bg.wasm?module';

// import tiktokenModel from '@dqbd/tiktoken/encoders/cl100k_base.json';
// import { Tiktoken, init } from '@dqbd/tiktoken/lite/init';
// import { prompts } from '@/built-in.prompts';

// export const config = {
//   runtime: 'edge',
// };

// const handler = async (req: Request): Promise<Response> => {
//   try {
//     const { model, messages, key, prompt, temperature } = (await req.json()) as ChatBody;

//     await init((imports) => WebAssembly.instantiate(wasm, imports));
//     const encoding = new Tiktoken(
//       tiktokenModel.bpe_ranks,
//       tiktokenModel.special_tokens,
//       tiktokenModel.pat_str,
//     );

//     let promptToSend = prompt;
//     if (!promptToSend) {
//         promptToSend = prompts?.findLast((p)=>p.name === 'default')?.content ||  DEFAULT_SYSTEM_PROMPT
//     }

//     let temperatureToUse = temperature;
//     if (temperatureToUse == null) {
//       temperatureToUse = DEFAULT_TEMPERATURE;
//     }

//     const prompt_tokens = encoding.encode(promptToSend);

//     let tokenCount = prompt_tokens.length;
//     let messagesToSend: Message[] = [];

//     for (let i = messages.length - 1; i >= 0; i--) {
//       const message = messages[i];
//       const tokens = encoding.encode(message.content);

//       if (tokenCount + tokens.length + 1000 > model.tokenLimit) {
//         break;
//       }
//       tokenCount += tokens.length;
//       messagesToSend = [message, ...messagesToSend];
//     }

//     encoding.free();

//     const stream = await OpenAIStream(model, promptToSend, temperatureToUse, key, messagesToSend, false);

//     return new Response(stream);
//   } catch (error) {
//     console.error(error);
//     if (error instanceof OpenAIError) {
//       return new Response('Error', { status: 500, statusText: error.message });
//     } else {
//       return new Response('Error', { status: 500 });
//     }
//   }
// };

// export default handler;


import { DEFAULT_SYSTEM_PROMPT, DEFAULT_TEMPERATURE } from '@/utils/app/const';
import { OpenAIError, OpenAIStream, OpenAIChatComletion } from '@/utils/server';

import { ChatBody, Message } from '@/types/chat';

// @ts-expect-error
import wasm from '../../node_modules/@dqbd/tiktoken/lite/tiktoken_bg.wasm?module';

import tiktokenModel from '@dqbd/tiktoken/encoders/cl100k_base.json';
import { Tiktoken, init } from '@dqbd/tiktoken/lite/init';
import { prompts } from '@/built-in.prompts';
import { OpenAIModel, OpenAIModelID, OpenAIModels } from '@/types/openai';

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const {model, resume, key, prompt, temperature} = (await req.json());

    await init((imports) => WebAssembly.instantiate(wasm, imports));
    const encoding = new Tiktoken(
      tiktokenModel.bpe_ranks,
      tiktokenModel.special_tokens,
      tiktokenModel.pat_str,
    );

    let promptToSend = prompt;
    if (!promptToSend) {
      promptToSend = prompts?.findLast((p)=>p.name === 'default')?.content || DEFAULT_SYSTEM_PROMPT
    }

    let temperatureToUse = temperature;
    if (temperatureToUse == null) {
      temperatureToUse = DEFAULT_TEMPERATURE;
    }

    let messagesToSend: Message[] = [];
    
    const message:Message ={
        role:"user",
        content:resume
    }

    messagesToSend = [message, ...messagesToSend];

    encoding.free();

    let modelToUse = model;
    if (!modelToUse){
        modelToUse = OpenAIModels['gpt-3.5-turbo']
    }

    const res = await OpenAIChatComletion(model, promptToSend, temperatureToUse, key, messagesToSend, false);
    if(res.ok)
    {
        let result = await res.json();
        let content = result.choices[0].message.content;
        return new Response(content);
    }
    else{
        return new Response(res.body, {status:res.status});
    }
  } catch (error) {
    console.error(error);
    if (error instanceof OpenAIError) {
      return new Response('Error', { status: 500, statusText: error.message });
    } else {
      return new Response('Error', { status: 500 });
    }
  }
};

export default handler;
