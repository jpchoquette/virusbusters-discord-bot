module.exports = {
  name: 'sales',
  description: "Shows latest sales",
  async execute(Discord, client, fetch) {
    const channel = '947925629448388650';
    let lastSaleTime = 0
    let firstPass = true
    const fetchSales = function (timestamp) {
      const query = 'https://wax.api.atomicassets.io/atomicmarket/v1/sales?state=3&collection_name=virusbusters&page=1&order=desc&sort=updated&after=' + timestamp
      // console.log('query', query)
      fetch(query, {
        headers: {
          accept: '*/*',
          'accept-language': 'en-US,en;q=0.9',
          'cache-control': 'no-cache',
          'content-type': 'application/json',
          pragma: 'no-cache',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
          'sec-gpc': '1'
        },
        referrer: 'https://wax.atomichub.io/',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: null,
        method: 'GET',
        mode: 'cors',
        credentials: 'omit'
      })
        .then(response => response.json())
        .then(data => {
          console.log('New sale found!', data)
          // console.log('times', timestamp)
          // sales()
          if (data && data.data && data.data.length) {
            console.log('sales', data.data, data.data[0].assets[0], data.data[0].price)
            data.data.forEach(sale => {
              if (sale.updated_at_time > lastSaleTime) {
                lastSaleTime = sale.updated_at_time
              }
              const sale_id = sale.sale_id
              const buyer = sale.buyer ? sale.buyer : "N/A"
              const seller = sale.seller ? sale.seller : "N/A"
              const mint = sale.assets[0].template_mint
              // const assetsQty = sale
              const assets = sale.assets[0].data.name ? sale.assets[0].data.name : "N/A"
              // let sale_timestamp = new Date(parseInt(sale.updated_at_time))
              let sale_timestamp = sale.updated_at_time / 1000
              let discord_time = '<t:' + parseInt(sale_timestamp) + '>'
              console.log('sale_timestamp', sale_timestamp, sale.updated_at_time)
              let price = sale.price.amount ? sale.price.amount * 0.00000001 : "N/A"
              price = price.toFixed(3).toString()
              let schema = sale.assets[0].schema.schema_name
              let image;
              image = `https://ipfs.io/ipfs/${sale.assets[0].data.img}`;
              sendMessage(buyer, seller, assets, price, image, discord_time, mint, sale_id, schema)
            })
          } else {
            // sendErrorMessage()
          }
          // sendMessage(buyer, seller, assets, price)
        })
    }
    const sendMessage = function (buyer, seller, assets, price, image, time, mint, sale_id, schema) {
      console.log('image', image)
      let embed = new Discord.MessageEmbed()
        .setColor('#e42643')
        // .setAuthor('New sale')
        .setTitle(assets)
        .setURL('https://wax.atomichub.io/market/sale/' + sale_id)
        .setThumbnail(image)
        // .setDescription("----------")
        .addFields(
          { name: 'Buyer', value: "[" + buyer + "](https://wax.atomichub.io/profile/" + buyer + " 'Buyer Atomic Hub Profile')", inline: true },
      		{ name: 'Seller', value: "[" + seller + "](https://wax.atomichub.io/profile/" + seller + " 'Seller Atomic Hub Profile')", inline: true },
          // used for spaĉing
      		// { name: '\u200B', value: '\u200B' },
          { name: 'Price', value: price + ' WAX', inline: false },
          { name: 'Schema', value: "[" + schema + "](https://wax.atomichub.io/market?collection_name=virusbusters&order=desc&sort=created&symbol=WAX&schema_name=" + schema + " 'Schema on the Atomic Hub Market')", inline: true },
          { name: 'Mint', value: '#' + mint, inline: true },
          { name: 'Sale date', value: time, inline: false }
      	)
        // .setTimestamp()
        // .setFooter('Virus Busters', 'https://ipfs.io/ipfs/QmYeCTHhJDDk1qEg61ShGkKFdjFUedxCULDJH7SHcHMc2U');
        .setFooter({ text: 'Virus Busters', iconURL: 'https://ipfs.io/ipfs/QmYeCTHhJDDk1qEg61ShGkKFdjFUedxCULDJH7SHcHMc2U' });

      client.channels.fetch(channel)
        .then(channel => {
            channel.send({ embeds: [embed] });
        })
      // message.channel.send({ embeds: [embed] });
    }
    const sendErrorMessage = function () {
      let embed = new Discord.MessageEmbed()
        .setColor('#e42643')
        .setTitle('Error')
        .setDescription("No new sales, sorry")
      client.channels.fetch(channel)
        .then(channel => {
            channel.send({ embeds: [embed] });
        })
      // message.channel.send({ embeds: [embed] });
    }
    const launchSalesFinder = function () {
      // let currentUnixTime = parseInt((new Date().getTime() / 1000).toFixed(0))
      let currentmillisecTime = parseInt((new Date().getTime()).toFixed(0))
      let timestamp = currentmillisecTime
      if (lastSaleTime === 0) {
        timestamp = (currentmillisecTime - 6000000)
      } else {
        timestamp = lastSaleTime
      }
      fetchSales(timestamp)
    }
    launchSalesFinder()
    setInterval(() => {
      console.log('checking for new sales')
      launchSalesFinder()
    }, 5 * 60 * 1000)
    // if (firstPass) {
    //   console.log('first pass through the sales')
    //   launchSalesFinder()
    //   firstPass = false
    // } else {
    //   console.log('not first pass through the sales')
    //   setInterval(() => {
    //     console.log('checking for new sales')
    //     launchSalesFinder()
    //   }, 5 * 60 * 1000)
    // }
  }
}
