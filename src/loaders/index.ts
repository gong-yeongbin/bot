import { Express } from 'express';
import mongooseLoader from './mongoose';
import scheduler from '../scheduler';

export default async (app: Express) => {
  await mongooseLoader();
  console.log('✌️ MongoDB Connected');
  scheduler();
};
