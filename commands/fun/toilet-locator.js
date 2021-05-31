const embed = require('../../utils/embeds')
const { randomInt } = require('../../utils/randomInt')
module.exports = {
  name: 'toilet-locator',
  description: 'Locate the nearest toilet!',
  run: async(client, message, args) => {
      const loca = randomInt(1, 50);

      embed.embed('Closest Toilet Found!', `The nearest toilet is ${loca} feet away!`, message);
  }
}