import axios from 'axios';
import cheario from 'cheerio';

const myStock = ['애플', '테슬라'];

const stock = {
  get: async (message: string) => {
    for (let i = 0; i < myStock.length; i++) {
      const getHtml = await axios.get(
        `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${encodeURIComponent(
          myStock[i]
        )}`
      );

      const $ = cheario.load(getHtml.data);
      const stockName: string = $(
        '#_cs_root > div.ar_spot > div > h3 > a > span.stk_nm'
      ).text();
      const stockValue: string = $(
        '#_cs_root > div.ar_spot > div > h3 > a > span.spt_con.dw > strong'
      ).text();
      message = `${message}\n${stockName} ${stockValue}`;
    }

    return message;
  },
};

export default stock;
