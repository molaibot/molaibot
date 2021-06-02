const embed = require('../../utils/embeds')
const { randomInt } = require('../../utils/randomInt')
module.exports = {
  name: 'ghost-buster',
  description: 'Locate the nearest ghost!',
  run: async(client, message, args) => {
      const location = randomInt(1, 50);

      embed.embed('Ghost Buster 6900', `The nearest ghost is ${location} meters away!`, message);
  }
}