const Discord = require('discord.js');
const fetch = require('node-fetch');

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
  console.log('client', client.user)
  client.commands.get('sales').execute(Discord, client, fetch);
});

client.on('messageCreate', (msg) => {
  // if (msg.content.includes('Hello Buster')) msg.reply('Hello employee.');
  // if (msg.content.includes('Hello Boss')) msg.reply('Hello employee.');
  if (msg.channelId === '947925629448388650') {
    if (msg.content.toUpperCase().includes('WORK') && !msg.author.bot){
      msg.channel.send("WORK, that's a word I like to hear.");
    }
  }
  // Reactions roles NOT USED ANYMORE
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  //
  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === 'quotes') {
    client.commands.get('quotes').execute(msg, args, Discord, client);
  }
  // if (command === 'sales') {
  //   client.commands.get('sales').execute(msg, Discord, client, fetch);
  // }
});

client.login(token);

// function fetchSales () {
//   const query = 'https://wax.api.atomicassets.io/atomicmarket/v1/sales?collection_name=virusbusters&page=1&limit=100&order=desc&sort=created'
//   fetch(query, {
//     headers: {
//       accept: '*/*',
//       'accept-language': 'en-US,en;q=0.9',
//       'cache-control': 'no-cache',
//       'content-type': 'application/json',
//       pragma: 'no-cache',
//       'sec-fetch-dest': 'empty',
//       'sec-fetch-mode': 'cors',
//       'sec-fetch-site': 'cross-site',
//       'sec-gpc': '1'
//     },
//     referrer: 'https://wax.atomichub.io/',
//     referrerPolicy: 'strict-origin-when-cross-origin',
//     body: null,
//     method: 'GET',
//     mode: 'cors',
//     credentials: 'omit'
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log('sales', data)
//       // this.ownedBusterTemplates = data.data
//       // console.log('data ' + this.type, data)
//     })
// }
// function sales(message, args, Discord, client) {
//   const channel = '947875738722390156';
//   fetchSales()
//   // const quotes = [
//   //   { message: "When your computer is down, we're the best in town" },
//   //   { message: "At this rate we'll have more employees than vȉ̸͍̬͇̘̌̇͛̉̃̓̀̋̃͠͝ruses...\n ...just kidding, we would need about 1,000,000 employees." },
//   //   { message: 'ATH? What is an ATH?? Automatic Treatment Hub??? A new antivirus I never heard about before?' },
//   //   { message: "Remember: If you're a virus, you're against us." },
//   //   { message: "And don't forget: If you get a virus, you know to call us." },
//   //   { message: "S̵̨̰̜̩̙͍̭̻͚͎͕̒̃̎̀̊͑̀̀̉̅̅͑͑̿̕e̸̻̱̯̹̜̻̳̅͗̈́̑̌n̶͈̼̏͐̊̋̄͒̅̈d̶̨̜̮̲̞͔̞̞̮̗́́́̀͗͋̇̆̀͂̍̎͂̚͝ ̷̖̜̱̙̲͇̫̜͓͚̳̙̲́͐͒̓͐̀̍͐͝ĥ̶͖̙̳̼̄̆͘ę̶̡͇͇͍̹͓͓̹̙͙̰̜̦̂l̸̡̳̬͕͔̥͒̌͗̔̀̾́͜p̵̛̘̣̓̏̈́̾͂" }
//   // ]
//   // const random = Math.floor(Math.random() * quotes.length)
//   let embed = new Discord.MessageEmbed()
//     .setColor('#e42643')
//     .setTitle('NEW SALE!!!')
//     .setDescription("\n\n - 𝓑𝓾𝓼𝓽𝓮𝓻 \n 𝒫𝓇𝑒𝓈𝒾𝒹𝑒𝓃𝓉 𝑜𝒻 𝒱𝒾𝓇𝓊𝓈 𝐵𝓊𝓈𝓉𝑒𝓇𝓈");
//
//   message.channel.send({ embeds: [embed] });
// }
