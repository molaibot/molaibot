const { randomInt } = require('@randomInt');
const embed = require('@embeds');
module.exports = {
  name: 'stab',
  description: 'Stab somebody',
  premium: true,
  cooldown: 1,
  run: async(client, message, args) => {
      const stabUser = message.mentions.users.first();

      embed.imgEmbed(`You stabbed ${stabUser.tag}!`, `🔪`, 'https://giffiles.alphacoders.com/834/8340.gif', message);
  }
}