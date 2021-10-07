const Discord = require('discord.js');

const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
require('dotenv').config();

const token = process.env.BOT_TOKEN;
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
  ],
  partials: ['MESSAGE', 'REACTION', 'CHANNEL']
});

const prefix = '-';
const fs = require('fs');

client.commands = new Discord.Collection();
// console.log('Collections', Collection)
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
console.log('commandfiles', commandFiles)
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Buster is online');
  // change status and activity of bot
  client.user.setPresence({
    activities: [{ name: 'his employees', type: 'WATCHING' }],
    status: 'available'
  });
  console.log('client', client.user)
});

client.on('messageCreate', (msg) => {
  if (msg.content.includes('Hello Buster')) msg.reply('Hello employee.');
  if (msg.content.includes('Hello Boss')) msg.reply('Hello employee.');
  if (msg.content === 'Boustan?') msg.reply('Priviet.');

  // Reactions roles
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === 'reactionrole') {
    client.commands.get('reactionrole').execute(msg, args, Discord, client);
  }
});

client.login(token);
