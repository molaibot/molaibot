const { randomInt } = require('@randomInt');
const embed = require('@embeds');
module.exports = {
  name: 'kiss',
  description: 'Kiss somebody',
  premium: true,
  cooldown: 1,
  run: async(client, message, args) => {
      const kissUser = message.mentions.users.first();

      if(!kissUser) return embed.embed('Mention Someone', 'You forgot to mention someone', message)

      embed.imgEmbed(`You kissed ${kissUser.tag}!`, `💋`, 'https://i.pinimg.com/originals/e3/4e/31/e34e31123f8f35d5c771a2d6a70bef52.gif', message);
  }
}