const { Client, Intents } = require('discord.js');
require('dotenv').config();

const token = process.env.BOT_TOKEN;

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  partials: ['MESSAGE', 'REACTION', 'CHANNEL']
});
// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Buster is online');
  // change status of bot
  client.user.setPresence({
    status: 'available',
    activity: {
        name: 'his employees',
        type: 'WATCHING'
    }
  });
});

client.on('message', (msg) => {
  if (msg.content === 'Hello Buster') msg.reply('Hello employee.');
  if (msg.content === 'Hello Boss') msg.reply('Hello employee.');
});

client.login(token);
