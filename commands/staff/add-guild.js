const embed = require('@embeds')
const premium = require('@models/premium-guild');
const day = require('dayjs');
module.exports = {
  name: 'add-guild',
  description: 'Add a guild to the list of premium',
  run: async(client, message, args) => {
    if (message.member.id !== '763767239018938368')
    return embed.error(
        "You aren't my owner",
        "You don't seem to have permissions to use this command.",
        message
    );

    const guildID = args[0];

    if (!guildID)
    return embed.error(
        "Please Provide A Guild ID",
        "How am i supposed to give them premium if you don't provide an id?",
        message
    );

    if (!client.guilds.cache.has(guildID))
    return embed.error(
        "I'm not in that guild.",
        "I don't seem to be in that guild, you could ask them to add me.",
        message
    );

    premium.findOne({ Guild: guildID }, async(err, data) =>{
      if(data) data.delete();

      if(args[1]) {

        const Expire = day(args[1]).valueOf();
        new premium({
          Guild: guildID,
          Expire,
          Permanant: false
        }).save().then(
          embed.embed('Gave the server premium', `Expiry: ${Expire} (unix) \nPermanant: false`)
        );
      } else {
        new premium({
          Guild: guildID,
          Expire: 0,
          Permanant: true
        }).save().then(
          embed.embed('Gave the server premium', `Expiry: 0\nPermanant: true`, message)
        );
      }
    })
  }
}