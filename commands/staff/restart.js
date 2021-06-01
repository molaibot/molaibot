const embed = require('../../utils/embeds');
const {token} = require('../../config.json');
module.exports = {
  name: 'restart',
  description: 'Restart me!',
  run: async(client, message, args) => {
    if(!message.member.id === '763767239018938368') {
      embed.error("You aren't my owner!", "Only my owner can restart me! Normies like you don't got no perms.", message);
    }

      embed.embed('Restarting...', 'I am restarting, give me a moment.', message).then(m => {
        client.destroy().then(() => {
          client.login(token);
        })
      });
  }
}