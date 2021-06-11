const schema = require('../../models/marriages');
const embed = require('../../utils/embeds');
module.exports = {
  name: 'marry',
  description: 'Marry someone',
  premium: true,
  cooldown: 86400000,
  run: async(client, message, args) => {
    const mUser = message.mentions.users.first();

    if(!mUser) return embed.error("Please mention someone!", "How will you get married, if you don't tell me who do you want to marry?!", message);

    await schema.findOne({ User: message.author.id }, async(err, data) =>{
        if(err) return embed.error("Error!", err, message);

        if(data) return embed.error("You already seem to be married", "You can't be married to 2 people at the same time! Get a divorce with `m/divorce`", message);

        if(!data) {
            new schema({
                To: mUser.id,
                User: message.author.id
            }).save().then(
                embed.embed(`You are now married to ${mUser.tag}!`, "Please tell them to run the command mentioning you so it is signed by both of you!", message)
            );
        }
    })
  }
}