module.exports = {
  name: 'quotes',
  description: "Randomizes thorugh quotes",
  async execute(message, args, Discord, client) {
    const channel = '893897354439184405';
    const quotes = [
      { message: "When your computer is down, we're the best in town" },
      { message: "At this rate we'll have more employees than vȉ̸͍̬͇̘̌̇͛̉̃̓̀̋̃͠͝ruses...\n ...just kidding, we would need about 1,000,000 employees." },
      { message: 'ATH? What is an ATH?? Automatic Treatment Hub??? A new antivirus I never heard about before?' },
      { message: "Remember: If you're a virus, you're against us." },
      { message: "And don't forget: If you get a virus, you know to call us." },
      { message: "S̵̨̰̜̩̙͍̭̻͚͎͕̒̃̎̀̊͑̀̀̉̅̅͑͑̿̕e̸̻̱̯̹̜̻̳̅͗̈́̑̌n̶͈̼̏͐̊̋̄͒̅̈d̶̨̜̮̲̞͔̞̞̮̗́́́̀͗͋̇̆̀͂̍̎͂̚͝ ̷̖̜̱̙̲͇̫̜͓͚̳̙̲́͐͒̓͐̀̍͐͝ĥ̶͖̙̳̼̄̆͘ę̶̡͇͇͍̹͓͓̹̙͙̰̜̦̂l̸̡̳̬͕͔̥͒̌͗̔̀̾́͜p̵̛̘̣̓̏̈́̾͂" }
    ]
    const random = Math.floor(Math.random() * quotes.length)
    let embed = new Discord.MessageEmbed()
      .setColor('#e42643')
      .setTitle('Quote no.' + (random + 1))
      .setDescription(quotes[random].message + "\n\n - 𝓑𝓾𝓼𝓽𝓮𝓻 \n 𝒫𝓇𝑒𝓈𝒾𝒹𝑒𝓃𝓉 𝑜𝒻 𝒱𝒾𝓇𝓊𝓈 𝐵𝓊𝓈𝓉𝑒𝓇𝓈");

    message.channel.send({ embeds: [embed] });
  }
}
