import express, { Express } from 'express';
import loaders from './loaders/index';

const app: Express = express();
loaders(app);

const server = app
  .listen(3000, () => {
    console.log('3000번 포트에서 서버 실행 중...');
  })
  .on('error', (err) => {
    console.log(err);
    process.exit(1);
  });

export { server };
