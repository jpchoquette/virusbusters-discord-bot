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
});

client.on('message', (msg) => {
  if (msg.content === 'Hello') msg.reply('Hello employee.');
});

console.log('token', token)
// client.login(process.env.BOT_TOKEN);
client.login(token);
