const { randomInt } = require('@randomInt');
const embed = require('@embeds');
module.exports = {
  name: 'punch',
  description: 'Punch somebody',
  premium: true,
  cooldown: 1,
  run: async(client, message, args) => {
      const punchUser = message.mentions.users.first();

      embed.imgEmbed(`You punched ${punchUser.tag}!`, `👊`, 'https://i.imgur.com/f2kkp3L.gif', message);
  }
}