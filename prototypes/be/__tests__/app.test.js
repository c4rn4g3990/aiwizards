"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
const core_1 = require("@action-validator/core");
const readFile = util_1.default.promisify(fs_1.default.readFile);
describe('POST /convertPipeline', () => {
    it('should return processed content', async () => {
        const filePath = path_1.default.resolve(__dirname, './jenkins-pipeline.txt'); // Update with your file path
        const content = await readFile(filePath, 'utf8');
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/convertPipeline')
            .set('Content-Type', 'text/plain')
            .send(content);
        expect(res.status).toBe(200);
        const state = (0, core_1.validateWorkflow)(res.body.data.content);
        const isValid = state.errors.length === 0;
        expect(isValid).toBeTruthy();
    }, 30000);
    it('should return error on missing content', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/convertPipeline')
            .set('Content-Type', 'text/plain')
            .send();
        expect(res.status).toBe(400);
        expect(res.text).toBe('Bad Request: Missing required content');
    });
});
