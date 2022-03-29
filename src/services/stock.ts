import axios from 'axios';
import cheario from 'cheerio';

const stock = {
  get: async (message: string) => {
    const getHtml = await axios.get(
      `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${encodeURIComponent(
        message
      )}`
    );

    const $ = cheario.load(getHtml.data);
    const stockValue: string = $(
      '#_cs_root > div.ar_spot > div > h3 > a strong'
    ).text();

    message = `${message} - ${stockValue}\n`;

    return message;
  },
};

export default stock;
