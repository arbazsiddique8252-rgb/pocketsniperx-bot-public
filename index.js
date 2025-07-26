const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '📡 Welcome! Select your OTC pair:\n1. EUR/USD\n2. GBP/USD\n3. USD/JPY', {
    reply_markup: {
      keyboard: [['EUR/USD'], ['GBP/USD'], ['USD/JPY']],
      resize_keyboard: true
    }
  });
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (['EUR/USD', 'GBP/USD', 'USD/JPY'].includes(text)) {
    bot.sendMessage(chatId, `✅ Pair selected: ${text}\nYou will now receive signals for ${text}`);
    // Start sending dummy signals
    setInterval(() => {
      const direction = Math.random() > 0.5 ? '⬆ Buy' : '⬇ Sell';
      bot.sendMessage(chatId, `📶 Signal for ${text}: ${direction}`);
    }, 60000); // every 1 minute
  }
});
