const {randomInt} = require('@randomInt')
const {embed} = require('@embeds')
module.exports = {
  name: 'super-market-locator',
  description: '',
  aliases: ['sml', 'sm-locator'],
  premium: true,
  cooldown: 1,
  run: async(client, message, args) => {
    const far = randomInt(20, 500);

    embed(`Super Market Found!`, `The super market is ${far} meters away!`, message);
  }
}