import axios from 'axios';
import moment from 'moment';

import stockService from '../services/stock';

import schedule from 'node-schedule';
const rule = new schedule.RecurrenceRule();
rule.tz = 'Asia/Seoul';

rule.second = 0;
rule.minute = 0;
rule.hour = 8;

export default () => {
  schedule.scheduleJob(rule, async (cb) => {
    const chatId: string = `${process.env.TELEGRAM_CHAT_ID}`;
    const token: string = `${process.env.TELEGRAM_TOKEN}`;
    const telegram_api: string = `https://api.telegram.org/bot${token}/sendmessage`;

    let message: string = `${moment().format('YYYY년 MM월 DD일')}\n`;

    const myStock = await stockService.list();

    for (let i = 0; i < myStock.length; i++) {
      message = message + (await stockService.get(myStock[i].name));
    }

    await axios.get(
      `${telegram_api}?chat_id=${chatId}&text=${encodeURIComponent(message)}`
    );
  });
};
