import request from 'supertest';
import app from '../app';
import fs from 'fs';
import path from 'path';
import util from 'util';
import {validateWorkflow} from "@action-validator/core";

const readFile = util.promisify(fs.readFile);

describe('POST /convertPipeline', () => {
    it('should return processed content', async () => {
        const filePath = path.resolve(__dirname, './jenkins-pipeline.txt');  // Update with your file path
        const content = await readFile(filePath, 'utf8');

        const res = await request(app)
            .post('/convertPipeline')
            .set('Content-Type', 'text/plain')
            .send(content);

        expect(res.status).toBe(200);
        const state = validateWorkflow(res.body.data.content);
        const isValid = state.errors.length === 0;
        expect(isValid).toBeTruthy();
    }, 30000);

    it('should return error on missing content', async () => {
        const res = await request(app)
            .post('/convertPipeline')
            .set('Content-Type', 'text/plain')
            .send();

        expect(res.status).toBe(400);
        expect(res.text).toBe('Bad Request: Missing required content');
    });
});
