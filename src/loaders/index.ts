import { Express } from 'express';
import axios from 'axios';

export default async (app: Express) => {
  const chatId: string = '';
  const token: string = ``;
  const telegram_api: string = `https://api.telegram.org/bot${token}/sendmessage`;
  const message: string = `하우 알 유!!! \ntest`;
  const text: string = encodeURIComponent(message);

  const url: string = `${telegram_api}?chat_id=${chatId}&text=${text}`;
  try {
    await axios.get(url);
  } catch (error) {}
};
