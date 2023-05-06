import { v4 as uuidv4 } from 'uuid';
import { OpenAIModels, OpenAIModelID } from '@/types/openai';
import { Prompt } from '@/types/prompt';
import { FolderInterface, FolderType } from "@/types/folder";

const systemFolderId = uuidv4();

const systemFolder: FolderInterface = {
  id: systemFolderId,
  name: 'System',
  type: 'prompt',
}


const resumeFolderId = uuidv4();
const resumeFolder: FolderInterface = {
  id: resumeFolderId,
  name: 'ResumeParser',
  type: 'prompt',
}


const prompts: Prompt[] = [
  {
    id: uuidv4(),
    name: 'defualt',
    description: '',
    content: 'You are a resume parser, I will provider you a resume, answer my questions based on the resume context, do not make up any content, here is the resume: ',
    model: OpenAIModels[OpenAIModelID.GPT_3_5],
    folderId: systemFolderId,
  },
  {
    id: uuidv4(),
    name: '中文简历处理',
    description: '默认的中文简历处理器',
    content: '请用Markdown格式重新生成一份求职简历，使用中文，简历应该包含以下段落：姓名，电话，邮箱，个人简介，',
    model: OpenAIModels[OpenAIModelID.GPT_3_5],
    folderId: resumeFolderId,
  },
  {
    id: uuidv4(),
    name: 'EnglishResumeParser',
    description: 'The defualt English resume parser',
    content: 'Re-generate a resume and output in markdown, the new resume should include name, mobile, email, summary, work expierence, education background, ',
    model: OpenAIModels[OpenAIModelID.GPT_3_5],
    folderId: resumeFolderId,
  }
];


const initPrompts = () => {
  localStorage.setItem('folders',  JSON.stringify([systemFolder, resumeFolder]));
  localStorage.setItem('prompts',  JSON.stringify(prompts));
}

const folders = [systemFolder, resumeFolder];

export {systemFolder, resumeFolder, folders, prompts, initPrompts};
