module.exports = {
  name: 'reactionrole',
  description: "Sets up a reaction role message!",
  async execute(message, args, Discord, client) {
    const channel = '894649634776023141';
    const yellowTeamRole = message.guild.roles.cache.find(role => role.name === 'Visitors');

    const yellowTeamEmoji = '🆔';

    let embed = new Discord.MessageEmbed()
      .setColor('#e42643')
      .setTitle('Hello future employees!')
      .setDescription("\n To gain the Visitor access, please click on the emoji (🆔) below. \n You'll be able to look around the office.\n\n See you around! \n\n - Buster");

    let messageEmbed = await message.channel.send({ embeds: [embed] });
    messageEmbed.react(yellowTeamEmoji);

    client.on('messageReactionAdd', async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name === yellowTeamEmoji) {
          await reaction.message.guild.members.cache.get(user.id).roles.add(yellowTeamRole);
        }
        // if (reaction.emoji.name === blueTeamEmoji) {
        //   await reaction.message.guild.members.cache.get(user.id).roles.add(blueTeamRole);
        // }
      } else {
        return;
      }
    });

    // client.on('messageReactionRemove', async (reaction, user) => {
    //
    //   if (reaction.message.partial) await reaction.message.fetch();
    //   if (reaction.partial) await reaction.fetch();
    //   if (user.bot) return;
    //   if (!reaction.message.guild) return;
    //
    //
    //   if (reaction.message.channel.id == channel) {
    //     if (reaction.emoji.name === yellowTeamEmoji) {
    //       await reaction.message.guild.members.cache.get(user.id).roles.remove(yellowTeamRole);
    //     }
    //     if (reaction.emoji.name === blueTeamEmoji) {
    //       await reaction.message.guild.members.cache.get(user.id).roles.remove(blueTeamRole);
    //     }
    //   } else {
    //     return;
    //   }
    // });
  }
}
