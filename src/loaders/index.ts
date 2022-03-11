import { Express } from 'express';
import mongooseLoader from './mongoose';

export default async (app: Express) => {
  await mongooseLoader();
  console.log('✌️ MongoDB Connected');
};
