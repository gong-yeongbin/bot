import schedule from 'node-schedule';
import axios from 'axios';
import moment from 'moment';
import dotenv from 'dotenv';

dotenv.config();

// 매일 아침 10시 텔레그램 메세지 전송
schedule.scheduleJob('0 0 10 * * *', async (cb) => {
  const chatId: string = `${process.env.TELEGRAM_CHAT_ID}`;
  const token: string = `${process.env.TELEGRAM_TOKEN}`;
  const telegram_api: string = `https://api.telegram.org/bot${token}/sendmessage`;

  const message: string = moment().format('YYYY-MM-DD HH:mm:ss');
  const text: string = encodeURIComponent(message);

  const url: string = `${telegram_api}?chat_id=${chatId}&text=${text}`;

  await axios.get(url);
});
