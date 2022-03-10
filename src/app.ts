import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

import dotenv from 'dotenv';
dotenv.config();

import schedule from 'node-schedule';
const rule = new schedule.RecurrenceRule();
rule.tz = 'Asia/Seoul';

rule.second = 0;
rule.minute = 0;
rule.hour = 10;

// 매일 아침 10시 텔레그램 메세지 전송
schedule.scheduleJob(rule, async (cb) => {
  const chatId: string = `${process.env.TELEGRAM_CHAT_ID}`;
  const token: string = `${process.env.TELEGRAM_TOKEN}`;
  const telegram_api: string = `https://api.telegram.org/bot${token}/sendmessage`;

  const isWeather = await axios.get(
    `${process.env.WEATHER_URL}?serviceKey=${
      process.env.WEATHER_SERVICE_KEY
    }&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${moment().format(
      'YYYYMMDD'
    )}&base_time=1000&nx=55&ny=127`
  );
  const weatherData = isWeather.data.response.body.items.item;
  const t1h = _.find(weatherData, { category: 'T1H' }).obsrValue; //기온
  const reh = _.find(weatherData, { category: 'REH' }).obsrValue; //습도

  const message: string = `${moment().format(
    'YYYY-MM-DD HH'
  )}시\n기온 ${t1h}℃\n습도 ${reh}%`;
  const text: string = encodeURIComponent(message);

  const url: string = `${telegram_api}?chat_id=${chatId}&text=${text}`;

  await axios.get(url);
});
