const marriages = require('../../models/marriages');
const embed = require('@embeds');
module.exports = {
  name: 'divorce',
  description: 'Get a divorce.',
  premium: true,
  cooldown: 20000,
  run: async(client, message, args) => {
    const params = {
        User: message.author.tag
    }

    await marriages.findOneAndDelete(params).then(
        embed.embed('You were divorced.', `Who's taking the kids? 🤣`, message)
    );
  }
}