import express, { Express } from 'express';
import loader from './loaders/index';

import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
loader(app);

const server = app
  .listen(3000, () => {
    console.log(`3000 번 포트에서 서버 실행 중 ...`);
  })
  .on('error', (err) => {
    console.log(err);
    process.exit(1);
  });

export { server };
