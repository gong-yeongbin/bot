import Weather from './models/Weather';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

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

    const t1h = 'test data';
    const reh = 'test data';

    const message: string = `${moment().format(
      'YYYY-MM-DD HH'
    )}시\n기온 ${t1h}℃\n습도 ${reh}%`;
    const text: string = encodeURIComponent(message);

    const url: string = `${telegram_api}?chat_id=${chatId}&text=${text}`;

    await axios.get(url);
  });

  schedule.scheduleJob('0 0 * * * *', async (cb) => {
    const hour: string = moment().subtract('1', 'hour').format('HH') + '00';
    const isWeather = await axios.get(
      `${process.env.WEATHER_URL}?serviceKey=${
        process.env.WEATHER_SERVICE_KEY
      }&pageNo=1&numOfRows=${hour}&dataType=JSON&base_date=${moment().format(
        'YYYYMMDD'
      )}&base_time=1000&nx=55&ny=127`
    );

    const weatherData = isWeather.data.response.body.items.item;

    const t1h = _.find(weatherData, { category: 'T1H' }).obsrValue;
    const rn1 = _.find(weatherData, { category: 'RN1' }).obsrValue;
    const uuu = _.find(weatherData, { category: 'UUU' }).obsrValue;
    const vvv = _.find(weatherData, { category: 'VVV' }).obsrValue;
    const reh = _.find(weatherData, { category: 'REH' }).obsrValue;
    const pty = _.find(weatherData, { category: 'PTY' }).obsrValue;
    const vec = _.find(weatherData, { category: 'VEC' }).obsrValue;
    const wsd = _.find(weatherData, { category: 'WSD' }).obsrValue;

    const weatherInstance = new Weather();
    weatherInstance.T1H = t1h;
    weatherInstance.RN1 = rn1;
    weatherInstance.UUU = uuu;
    weatherInstance.VVV = vvv;
    weatherInstance.REH = reh;
    weatherInstance.PTY = pty;
    weatherInstance.VEC = vec;
    weatherInstance.WSD = wsd;

    weatherInstance.save((error, result) => {
      if (error) console.log(error);
    });
  });
};
