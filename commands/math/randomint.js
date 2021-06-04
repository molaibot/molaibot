const { randomInt } = require('@randomInt');
const { titleOnly } = require('@embeds');
module.exports = {
  name: 'randomint',
  description: 'Generates a random number!',
  aliases: ['random-integer', 'randomnumber'],
  cooldown: 1000,
  run: async(client, message, args) => {
      const answer = randomInt(1, 1000);

      titleOnly(`Your Random Number: ${answer}`, message);
  }
}