import { Prompt } from '@/types/prompt';
import {folders as defaultFolders, prompts as defaultPrompts} from '@/built-in.prompts';
import { DEFAULT_SYSTEM_PROMPT, DEFAULT_TEMPERATURE } from '@/utils/app/const';

export const updatePrompt = (updatedPrompt: Prompt, allPrompts: Prompt[]) => {
  const updatedPrompts = allPrompts.map((c) => {
    if (c.id === updatedPrompt.id) {
      return updatedPrompt;
    }

    return c;
  });

  savePrompts(updatedPrompts);

  return {
    single: updatedPrompt,
    all: updatedPrompts,
  };
};

export const savePrompts = (prompts: Prompt[]) => {
  localStorage.setItem('prompts', JSON.stringify(prompts));
};


export const getDefaultSystemPrompt = ():string => {
  let prompts: Prompt[] = [];
  let promptsString = localStorage.getItem('prompts');
  if (promptsString) {
    prompts = JSON.parse(promptsString)
  }
  let prompt = prompts?.findLast((p)=>p.name === 'default')
  if (prompt) {
    return prompt.content
  }
  prompt = defaultPrompts?.findLast((p)=>p.name === 'default')
  if (prompt) {
    return prompt.content
  }
  return DEFAULT_SYSTEM_PROMPT;
}