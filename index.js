const { Client, Intents } = require('discord.js');
// require('dotenv').config();
const { token } = require('../config.json');

// const token = process.env.BOT_TOKEN;

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  partials: ['MESSAGE', 'REACTION', 'CHANNEL']
});
// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Buster is online');
});

client.on('message', (msg) => {
  if (msg.content === 'Hello') msg.reply('Hi');
});

// Adding reaction-role function
client.on('messageReactionAdd', async (reaction, user) => {
  try {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.message.channel.id == '894649824090136597') {
      if (reaction.emoji.name === '🚪') {
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.add('894641128454914168');
      }
    } else return;
  } catch (error) {
    console.error(error);
  }
});

// Removing reaction roles
// client.on('messageReactionRemove', async (reaction, user) {
//   try {
//     if (reaction.message.partial) await reaction.message.fetch();
//     if (reaction.partial) await reaction.fetch();
//     if (user.bot) return;
//     if (!reaction.message.guild) return;
//     if (reaction.message.channel.id == '894649824090136597') {
//       if (reaction.emoji.name === '🚪') {
//         await reaction.message.guild.members.cache
//           .get(user.id)
//           .roles.remove('894641128454914168');
//       }
//     } else return;
//   } catch (error) {
//     console.error(error);
//   }
// });

// console.log('token', process.env.BOT_TOKEN)
// client.login(process.env.BOT_TOKEN);
client.login(token);
