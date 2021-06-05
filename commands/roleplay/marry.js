const marriages = require('../../models/marriages');
const embed = require('@embeds');
module.exports = {
  name: 'marry',
  description: 'Marry the love of your life',
  premium: true,
  cooldown: 30000,
  run: async(client, message, args) => {
    const user = message.mentions.users.first();

    if(!user) return embed.error('Mention A User', 'How am i supposed to know who you want to marry?', message);

    await marriages.findOne({ User: message.author.tag }, async(err, data) =>{
      if(data) return embed.embed(`You're already married...`, 'You can divorce them then get married.', message);
    })

    await marriages.create({
        User: message.author.tag,
        MarriedTo: user.tag
    }).then(
        embed.embed(`You married ${user.tag}!`, 'Congratulations!', message)
    );
  }
}