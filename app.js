const { Client, Intents } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  partials: ['MESSAGE', 'REACTION', 'CHANNEL']
});

client.on('ready', () => {
  console.log('Buster is online');
});

client.login(process.env.BOT_TOKEN)

client.on('message', (msg) => {
  if (msg.content === 'Hello') msg.reply('Hi');
});

// Adding reaction-role function
client.on('messageReactionAdd', async (reaction, user) => {
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
});

// Removing reaction roles
client.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.channel.id == '894649824090136597') {
    if (reaction.emoji.name === '🚪') {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove('894641128454914168');
    }
  } else return;
});
