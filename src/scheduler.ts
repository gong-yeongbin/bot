import Weather from './models/Weather';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

import stock from './services/stock';

import schedule from 'node-schedule';
const rule = new schedule.RecurrenceRule();
rule.tz = 'Asia/Seoul';

rule.second = 0;
rule.minute = 0;
rule.hour = 10;

export default () => {
  // 매일 아침 10시 텔레그램 메세지 전송
  schedule.scheduleJob(rule, async (cb) => {
    const chatId: string = `${process.env.TELEGRAM_CHAT_ID}`;
    const token: string = `${process.env.TELEGRAM_TOKEN}`;
    const telegram_api: string = `https://api.telegram.org/bot${token}/sendmessage`;

    let message: string = `${moment().format('YYYY년 MM월 DD일')}\n`;

    const myStock = ['애플', '테슬라', '루시드그룹'];

    for (let i = 0; i < myStock.length; i++) {
      message = message + (await stock.get(myStock[i]));
    }

    await axios.get(
      `${telegram_api}?chat_id=${chatId}&text=${encodeURIComponent(message)}`
    );
  });
};
