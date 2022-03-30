import TelegramBot from 'node-telegram-bot-api';
import storkService from '../services/stock';
import Stork from '../models/Stock';

export default () => {
  const token: string = process.env.TELEGRAM_TOKEN as string;
  const bot: TelegramBot = new TelegramBot(token, { polling: true });

  bot.onText(
    /\/add(.+)/,
    async (msg: TelegramBot.Message, match: RegExpExecArray | null) => {
      const chatId: number = msg.chat.id;

      await storkService.add('테슬라');

      bot.sendMessage(chatId, `테슬라 추가!`);
    }
  );

  bot.onText(
    /\/list/,
    async (msg: TelegramBot.Message, match: RegExpExecArray | null) => {
      const chatId: number = msg.chat.id;

      const storkInstance = await storkService.list();
      let text: string = '';

      for (let i = 0; i < storkInstance.length; i++) {
        text = `- ${storkInstance[i].name}\n`;
      }

      bot.sendMessage(chatId, text);
    }
  );
};
