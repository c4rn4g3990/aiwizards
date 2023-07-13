import express from 'express';
import * as dotenv from 'dotenv';
import { pipelineActions } from './stores/filePipelineStore'

import cors from 'cors';

dotenv.config({path: require('find-config')('.env')});
console.log(`process.env.PORT: ${process.env.PORT}`)

const app = express();
const port = process.env.PORT || 3000;

app.use(express.text());
app.use(cors({
    credentials: true,
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/aiwizards', require('./routes/aiwizardsRoutes'));

pipelineActions.load();

app.listen(port, () => console.log(`Server is listening on port ${port}`));

export default app;