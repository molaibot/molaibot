const { randomInt } = require('@randomInt');
const embed = require('@embeds');
module.exports = {
  name: 'stab',
  description: 'Stab somebody',
  premium: true,
  cooldown: 1,
  run: async(client, message, args) => {
      const stabUser = message.mentions.users.first();
      
      if(!stabUser) return embed.embed('Mention Someone', 'You forgot to mention someone', message)

      embed.imgEmbed(`You stabbed ${stabUser.tag}!`, `🔪`, 'https://giffiles.alphacoders.com/834/8340.gif', message);
  }
}