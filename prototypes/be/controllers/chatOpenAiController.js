"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("langchain/chat_models/openai");
const schema_1 = require("langchain/schema");
const chains_1 = require("langchain/chains");
const memory_1 = require("langchain/memory");
const dotenv = __importStar(require("dotenv"));
const fs = __importStar(require("fs-extra"));
const prompts_1 = require("langchain/prompts");
const filePipelineStore_1 = require("../stores/filePipelineStore");
const utils_1 = require("../utils/utils");
dotenv.config({ path: require('find-config')('.env') });
console.log(`process.env.OPENAI_API_KEY: ${process.env.OPENAI_API_KEY}`);
console.log("CONTROLLER INIT");
const conversationState = {
    chain: null,
    chainReviewer: null
};
const chatopenai = new openai_1.ChatOpenAI({ temperature: 0, openAIApiKey: process.env.OPENAI_API_KEY });
const chatopenaiCreative = new openai_1.ChatOpenAI({ temperature: 0.7, openAIApiKey: process.env.OPENAI_API_KEY, modelName: 'gpt-3.5-turbo-16k-0613' });
const convertPipeline = async (req, res) => {
    console.log(typeof req.body);
    const { humanPrompt, toType, fromType } = JSON.parse(req.body);
    console.log(`got request to: ${humanPrompt}`);
    console.log(`got request to: ${toType}`);
    console.log(`got request to: ${fromType}`);
    if (!humanPrompt || Object.values(humanPrompt || {}).length === 0 || humanPrompt.trim().length === 0) {
        return res.status(400).json({
            success: false,
            error: 'Bad Request: Missing required content',
        });
    }
    console.log(`Request: ${humanPrompt}`);
    try {
        const outboundContent = await chatopenai.call([
            new schema_1.SystemChatMessage("You're a professional DevOps engineer with 5+ years of experience."),
            new schema_1.HumanChatMessage(`Convert the following ${fromType}  pipeline to ${toType} pipeline:\n`
                + humanPrompt),
        ]);
        console.log(outboundContent.toJSON());
        res.status(200).json({
            success: true,
            data: outboundContent,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error: Something went wrong',
        });
    }
};
const pipelineByTags = async (req, res) => {
    var result = "";
    console.log(typeof req.body);
    const { tags, answers, startGeneration } = JSON.parse(req.body);
    console.log("req: ", `${req.body}`);
    console.log("tags: ", typeof tags);
    if (startGeneration) {
        const example = (0, utils_1.encodeCurlyBrackets)(filePipelineStore_1.pipelineActions.getFileContentByTags(tags));
        console.log("example: " + example);
        const systemPrompt = fs.readFileSync('../../prototypes/notebooks/pipeline_generation/data/system_prompt.txt', 'utf8');
        const systemMessagePrompt = prompts_1.SystemMessagePromptTemplate.fromTemplate(systemPrompt);
        const humanPrompt = fs.readFileSync('../../prototypes/notebooks/pipeline_generation/data/human_prompt.txt', 'utf8')
            .replace('{example}', example);
        const humanMessagePrompt = await prompts_1.HumanMessagePromptTemplate.fromTemplate(humanPrompt);
        const chatPrompt = prompts_1.ChatPromptTemplate.fromPromptMessages([
            systemMessagePrompt,
            new prompts_1.MessagesPlaceholder("history"),
            humanMessagePrompt,
            prompts_1.HumanMessagePromptTemplate.fromTemplate("{input}"),
        ]);
        conversationState.chain = new chains_1.ConversationChain({
            memory: new memory_1.BufferMemory({ returnMessages: true, memoryKey: "history" }),
            prompt: chatPrompt,
            llm: chatopenai
        });
        if (!conversationState.chain)
            throw new Error("Chain is not initialized");
        result = conversationState && await conversationState.chain.predict({ input: `${answers}` });
    }
    else {
        if (!conversationState.chain)
            throw new Error("Chain is not initialized");
        result = conversationState && await conversationState.chain.run({ input: `${answers}` });
    }
    console.log("result: " + result);
    res.status(200).json({
        success: true,
        data: result,
    });
};
const reviewPipeline = async (req, res) => {
    var result = "";
    console.log(typeof req.body);
    const { pipeline, items, startGeneration } = JSON.parse(req.body);
    console.log("startGeneration: " + startGeneration);
    if (startGeneration) {
        const systemPrompt = fs.readFileSync('../../prototypes/notebooks/pipeline_review/data/system_prompt.txt', 'utf8');
        const systemMessagePrompt = prompts_1.SystemMessagePromptTemplate.fromTemplate(systemPrompt);
        const humanPrompt = fs.readFileSync('../../prototypes/notebooks/pipeline_review/data/human_prompt.txt', 'utf8')
            .replace('{pipeline}', (0, utils_1.encodeCurlyBrackets)(pipeline));
        const humanMessagePrompt = await prompts_1.HumanMessagePromptTemplate.fromTemplate(humanPrompt);
        const chatPrompt = prompts_1.ChatPromptTemplate.fromPromptMessages([
            systemMessagePrompt,
            new prompts_1.MessagesPlaceholder("history"),
            humanMessagePrompt,
            prompts_1.HumanMessagePromptTemplate.fromTemplate("{input}"),
        ]);
        conversationState.chainReviewer = new chains_1.ConversationChain({
            memory: new memory_1.BufferMemory({ returnMessages: true, memoryKey: "history" }),
            prompt: chatPrompt,
            llm: chatopenai
        });
        if (!conversationState.chainReviewer)
            throw new Error("Chain is not initialized");
        result = conversationState && await conversationState.chainReviewer.predict({ input: "" });
        console.log("result: " + result);
    }
    else {
        var userPromptTemplate = `Please apply items {items} and provide the updated pipeline.
    The output should contain the new pipeline and the new list of actions.
    Right after updated pipeline generate the new list of 10 actions
    and delimit list of actions with ########.
    The output should be easily parseable programmatically.`;
        const humanMessagePrompt = await prompts_1.HumanMessagePromptTemplate.fromTemplate(userPromptTemplate).format({ items: items });
        const newHumanPrompt = humanMessagePrompt.text;
        console.log("newHumanPromt: " + newHumanPrompt);
        if (!conversationState.chainReviewer)
            throw new Error("Chain is not initialized");
        result = conversationState && await conversationState.chainReviewer.predict({ input: newHumanPrompt });
        console.log("result: " + result);
    }
    res.status(200).json({
        success: true,
        data: result,
    });
};
module.exports = { convertPipeline, pipelineByTags, reviewPipeline };
