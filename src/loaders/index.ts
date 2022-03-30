import { Express } from 'express';
import mongooseLoader from './mongoose';
import scheduler from './scheduler';
import teletegramBot from './telegramBot';

export default async (app: Express) => {
  await mongooseLoader();
  console.log('✌️  MongoDB Connected');
  teletegramBot();
  console.log('✌️  TelegramBot On');
  scheduler();
  console.log('✌️  Scheduler On');
};
