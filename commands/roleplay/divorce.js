const schema = require('../../models/marriages');
const embed = require('../../utils/embeds');
module.exports = {
  name: 'divorce',
  description: 'Get divorced!',
  premium: true,
  cooldown: 86400000,
  run: async(client, message, args) => {
    await schema.findOne({ User: message.author.id }, async(err, data) => {
        if(!data) return embed.error("You aren't married.", "You don't seem to be married, who are you getting a divorce from? Yourself? 🤣", message);

        data.delete().then(
            embed.embed("You just got divorced!", "Who's taking the kids? 😆", message)
        );
    })
  }
}