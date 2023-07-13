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
exports.pipelineActions = void 0;
const fs = __importStar(require("fs-extra"));
const state = {
    fileTags: Object,
    fileNamesByTags: new Map()
};
exports.pipelineActions = {
    load() {
        console.log('XXXXXXXXXXXXXXXXXXXX');
        const filePath = '../../prototypes/notebooks/pipeline_generation/data/tags.json';
        console.log('YYYYYYYYYYYYYYYYYY');
        fs.readJson(filePath)
            .then(jsonData => {
            state.fileTags = jsonData;
            console.log('Parsed JSON object:', jsonData);
            const result = this.searchFilesByTags(['npm', 'gcp', 'github']);
            console.log(result);
        })
            .catch(err => {
            console.error('Error reading or parsing JSON:', err);
        });
    },
    searchFilesByTags(tags) {
        console.log('==========================================');
        console.log(`tags:`, tags);
        return Object.entries(state.fileTags)
            .filter(([file_path, ftags]) => tags.every(tag => ftags.includes(tag)))
            .map(([file_path]) => file_path);
    },
    getFileContentByTags(tags) {
        const matchingFiles = this.searchFilesByTags(tags);
        if (matchingFiles.length === 0) {
            throw new Error(`Error: no tag matching to tags ${tags} pipeline found.`);
        }
        if (matchingFiles.length === 1) {
            const filePath = matchingFiles[0];
            console.log("../../prototypes/notebooks/pipeline_generation/data/" + filePath);
            try {
                const fileContents = fs.readFileSync("../../prototypes/notebooks/pipeline_generation/data/" + filePath, 'utf8');
                return fileContents;
            }
            catch (err) {
                throw new Error(`Error: Failed to read file ${filePath}.`);
            }
        }
        else {
            throw new Error("Error: The specified tags match more than one file.");
        }
    }
};
