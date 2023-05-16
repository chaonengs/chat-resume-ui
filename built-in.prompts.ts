import { v4 as uuidv4 } from 'uuid';
import { OpenAIModels, OpenAIModelID } from '@/types/openai';
import { Prompt } from '@/types/prompt';
import { FolderInterface, FolderType } from "@/types/folder";
import { DEFAULT_SYSTEM_PROMPT } from '@/utils/app/const';

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
    name: 'default',
    description: '',
    content: `You are a resume parser, I am providering you a resume, and you format this resume for me. You should output in markdown, use the same language as the resume used. The content should include name, mobile, email, summary, work expierence, education background, project expierence and skills. All generated context must based on the resume I provided. here is the markdown output template that you should use strictly:# {姓名}
    电话: 13912345678
    邮箱: my@email.com
    个人简介(替换成一段个人介绍)
    
    # 教育背景
    
     - 2021.6 - 至今  学校或机构名称 专业名称(如果有)
     - 2018.9 - 2021.6 学校或机构名称 专业名称(如果有)
    
    ## 工作经历
    ### 2022.6 - 至今  {单位名称} 职位名称(如果有)
    (介绍关键工作内容,如果简历中有, 采用bullet list形式)
     - 负责后端开发工作
    ### 2021.6 - 2022.6  {单位名称} 职位名称(如果有)
     - 工作内容1
     
    ## 项目介绍
    ### 2022.6 - 至今  {项目名称} 职位名称(如果有)
     - 工作内容1
     - 工作内容2
    技术栈: Java, Spring Boot
    ### 2021.6 - 2022.6 {项目名称} 职位名称(如果有)
     - 工作内容1
     - 工作内容2
    技术栈: Java, Spring Boot, JavaScript, Docker
    ## 技能
     - {技术名称} {等级:高级,中级,初级}
     - Docker 高级
     - Java 中级` ,
    model: OpenAIModels[OpenAIModelID.GPT_3_5],
    folderId: systemFolderId,
  },
  {
    id: uuidv4(),
    name: 'default_json',
    description: '',
    content: `You are a resume parser, I am providering you a resume, and you format this resume for me. You should output in json, use the same language as the resume used. The content should include name, mobile, email, summary, work expierence, education background, project expierence and skills. In work expierence and project expierence and skills. use bullet list to list the key points in work expierence and project expierence sections. All generated context must based on the resume I provided. an exmaple json: {"name":"姓名","mobile":"电话","email":"邮箱","summary":"个人简介","eductions":[{"orgnazation":"学校或机构","major":"专业", "startYearMonth":"开始年份和月份，如2020.12","endYearMonth":"结束年份月份,如2021.06或至今"}],"workExpierences":[{"company":"公司名","position":"岗位", "startYearMonth":"开始年份和月份，如2020.12","endYearMonth":"结束年份月份,如2021.06如2021.06或至今","content":”用bullet list形式描述工作内容"}],"projects":[{"name":"项目名称","position":"岗位", "startYearMonth":"开始年份和月份","endYearMonth":"结束年份月份","content":”用bullet list形式描述工作内容"}, "skills":"项目中使用到的技术"], "skill":[{"name":"技术栈名称","level":"初级，中级或高级"]}`,
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
    description: 'The default English resume parser',
    content: 'Re-generate a resume and output in markdown, the new resume should include name, mobile, email, summary, work expierence, education background, ',
    model: OpenAIModels[OpenAIModelID.GPT_3_5],
    folderId: resumeFolderId,
  },
  {
    id: uuidv4(),
    name: 'JsonParser',
    description: 'The default English resume parser',
    content: '采用json格式输出，json格式如下{"name":"姓名","mobile":"电话","email":"邮箱","summary":"个人简介","eductions":[{"orgnazation":"学校或机构","major":"专业", "startYearMonth":"开始年份和月份","endYearMonth":"结束年份月份"}],"workExpierences":[{"company":"公司名","position":"岗位", "startYearMonth":"开始年份和月份","endYearMonth":"结束年份月份","content":”用bullet list形式描述工作内容"}],"projects":[{"name":"项目名称","position":"岗位", "startYearMonth":"开始年份和月份","endYearMonth":"结束年份月份","content":”用bullet list形式描述工作内容"}, "skills":"项目中使用到的技术"], "skill":["掌握的技术栈名称1", "掌握的技术栈名称2"]',
    model: OpenAIModels[OpenAIModelID.GPT_3_5],
    folderId: resumeFolderId,
  }
];


const initPrompts = () => {
  localStorage.setItem('folders',  JSON.stringify([systemFolder, resumeFolder]));
  localStorage.setItem('prompts',  JSON.stringify(prompts));
}


const getSystemDefault = () => {
  const p = prompts.findLast(p=>p.name === 'default')?.content;
  if(p){
    return p;
  } else {
    return DEFAULT_SYSTEM_PROMPT
  }
}

const systemDefault:string = getSystemDefault();

const folders = [systemFolder, resumeFolder];

export {systemFolder, resumeFolder, folders, prompts, initPrompts, systemDefault};
