import axios from 'axios';
import cheario from 'cheerio';

import Stock from '../models/Stock';

const stock = {
  get: async (stockName: string) => {
    const getHtml = await axios.get(
      `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${encodeURIComponent(
        stockName
      )}`
    );

    const $ = cheario.load(getHtml.data);
    const stockValue: string = $(
      '#_cs_root > div.ar_spot > div > h3 > a strong'
    ).text();

    stockName = `${stockName} - ${stockValue}\n`;

    return stockName;
  },
  add: async (stockName: string) => {
    return await Stock.create({ name: stockName });
  },
  del: async (stockName: string) => {
    return await Stock.deleteOne({ name: stockName });
  },
  list: async () => {
    return await Stock.find({});
  },
};

export default stock;
