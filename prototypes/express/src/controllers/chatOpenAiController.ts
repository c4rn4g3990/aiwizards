import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory"
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import * as fs from 'fs-extra';
import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  ChatPromptTemplate,
  MessagesPlaceholder
} from "langchain/prompts";
import { pipelineActions } from '../stores/filePipelineStore';
import { encodeCurlyBrackets } from '../utils/utils';

dotenv.config({ path: require('find-config')('.env') });
console.log(`process.env.OPENAI_API_KEY: ${process.env.OPENAI_API_KEY}`)

console.log("CONTROLLER INIT")

const conversationState = {
  chain: null as null | ConversationChain
}

const chatopenai = new ChatOpenAI({ temperature: 0, openAIApiKey: process.env.OPENAI_API_KEY });

const convertPipeline = async (req: Request, res: Response) => {
  console.log(typeof req.body)
  const { humanPrompt, toType, fromType } = JSON.parse(req.body);

  console.log(`got request to: ${humanPrompt}`)
  console.log(`got request to: ${toType}`)
  console.log(`got request to: ${fromType}`)

  if (!humanPrompt || Object.values(humanPrompt || {}).length === 0 || humanPrompt.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Bad Request: Missing required content',
    });
  }


  console.log(`Request: ${humanPrompt}`);
  try {
    const outboundContent = await chatopenai.call([
      new SystemChatMessage(
        "You're a professional DevOps engineer with 5+ years of experience."
      ),
      new HumanChatMessage(`Convert the following ${fromType}  pipeline to ${toType} pipeline:\n`
        + humanPrompt),
    ]);

    console.log(outboundContent.toJSON())

    res.status(200).json({
      success: true,
      data: outboundContent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error: Something went wrong',
    });
  }
}

const pipelineByTags = async (req: Request, res: Response) => {
  var result = ""
  console.log(typeof req.body)
  const { tags, answers, startGeneration } = JSON.parse(req.body);

  console.log("req: ", `${req.body}`)
  console.log("tags: ", typeof tags)

  if (startGeneration) {
    const example = encodeCurlyBrackets(pipelineActions.getFileContentByTags(tags))

    console.log("example: " + example)

    const systemPrompt = fs.readFileSync('../../prototypes/notebooks/pipeline_generation/data/system_prompt.txt', 'utf8');
    const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(systemPrompt)

    const humanPrompt = fs.readFileSync('../../prototypes/notebooks/pipeline_generation/data/human_prompt.txt', 'utf8')
        .replace('{example}', example);

    const humanMessagePrompt = await HumanMessagePromptTemplate.fromTemplate(humanPrompt)

    const chatPrompt = ChatPromptTemplate.fromPromptMessages(
      [
        systemMessagePrompt,
        new MessagesPlaceholder("history"),
        humanMessagePrompt,
        HumanMessagePromptTemplate.fromTemplate("{input}"),
      ]);

    conversationState.chain = new ConversationChain({
      memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
      prompt: chatPrompt,
      llm: chatopenai
    });
    if (!conversationState.chain) throw new Error("Chain is not initialized")
    result = conversationState && await conversationState.chain.predict({ input: `${answers}` })

  } else {
    if (!conversationState.chain) throw new Error("Chain is not initialized")
    result = conversationState && await conversationState.chain.run({ input: `${answers}` })
  }

  console.log("result: " + result)
  res.status(200).json({
    success: true,
    data: result,
  });

}

module.exports = { convertPipeline, pipelineByTags };
