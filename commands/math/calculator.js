const { randomInt } = require('@randomInt');
const embed = require('@embeds');
const { Calculator } = require('weky')
module.exports = {
  name: 'calulator',
  description: 'A Calculator',
  premium: true,
  cooldown: 1000,
  run: async(client, message, args) => {
    await Calculator(message)
  }
}