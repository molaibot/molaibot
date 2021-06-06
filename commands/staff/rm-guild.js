const embed = require('@embeds')
const premium = require('@models/premium-guild');
module.exports = {
  name: 'rm-guild',
  description: 'Remove a guild from the list of premium',
  run: async(client, message, args) => {
    if (message.member.id !== '763767239018938368')
    return embed.error(
        "You aren't my owner",
        "You don't seem to have permissions to use this command.",
        message
    );

    const guildID = args[0];

    if(!guildID)
    return embed.error(
      "Provide A GuildID",
      "Please Provide A Guild ID, I cannot terminate a server's premium subscription without the ID.",
      message
    );

    premium.findOne({ Guild: guildID }, async(err, data) =>{
        if(!data)
        return embed.error(
          "Guild Not Found",
          "The guild doesn't have premium.",
          message
        );

        data.delete().then(
          embed.embed(
            "I ended their premium subscription",
            "They don't have access to the premium commands anymore.",
            message
          )
        );
    })
  }
}