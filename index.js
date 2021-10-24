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

const prefix = '!';
const fs = require('fs');

client.commands = new Discord.Collection();

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
  // if (msg.content === 'Boustan?') msg.reply('Priviet.');
  if (msg.content.toUpperCase().includes('WORK') && !msg.author.bot){
    // setTimeout(() => {
    //   // msg.channel.send('hello' + msg.author.username);
    //   let embed = new Discord.MessageEmbed()
    //     .setColor('#e42643')
    //     .setTitle("Yes " + msg.author.username + '!')
    //     .setDescription("\n WORK, that's a word I like to hear! \n\n - 𝓑𝓾𝓼𝓽𝓮𝓻 \n 𝒫𝓇𝑒𝓈𝒾𝒹𝑒𝓃𝓉 𝑜𝒻 𝒱𝒾𝓇𝓊𝓈 𝐵𝓊𝓈𝓉𝑒𝓇𝓈");
    //    msg.channel.send({ embeds: [embed] });
    // }, 1000)
    msg.channel.send("WORK, that's a word I like to hear.");
  }

  if (msg.content === 'Hey Buster') {
    // msg.reply('Hello employee.');
    const channel = '893897354439184405';
    const whitelistEmoji = '🆔';

    // const yellowTeamRole = message.guild.roles.cache.find(role => role.name === 'Visitors');
    // const yellowTeamEmoji = '🆔';
    let embed = new Discord.MessageEmbed()
      .setColor('#e42643')
      .setTitle('What can I help you with?')
      .setDescription("\n I want a raise \n\n - Buster");
     msg.channel.send({ embeds: [embed] });

     messageEmbed.react(whitelistEmoji);
     client.on('messageReactionAdd', async (reaction, user) => {
       if (reaction.message.partial) await reaction.message.fetch();
       if (reaction.partial) await reaction.fetch();
       if (user.bot) return;
       if (!reaction.message.guild) return;

       if (reaction.message.channel.id == channel) {
         if (reaction.emoji.name === whitelistEmoji) {
           await reaction.message.guild.members.cache.get(user.id).roles.add(yellowTeamRole);
         }
         // if (reaction.emoji.name === blueTeamEmoji) {
         //   await reaction.message.guild.members.cache.get(user.id).roles.add(blueTeamRole);
         // }
       } else {
         return;
       }
     });
  }
  // Reactions roles NOT USED ANYMORE
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  //
  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === 'quotes') {
    client.commands.get('quotes').execute(msg, args, Discord, client);
  }
  // if (command === 'reactionrole') {
  //   client.commands.get('reactionrole').execute(msg, args, Discord, client);
  // }
});

client.login(token);
