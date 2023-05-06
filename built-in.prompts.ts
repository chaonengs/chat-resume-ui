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
    content: '生成一份新的求职简历，要求新生成的简历包含求职者姓名，电话，邮箱，个人简介，教育经历，工作经验，项目经验和技能。在工作经验和项目经验中，请用bullet list的形式，列出重点。用markdown格式输出，使用中文',
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
