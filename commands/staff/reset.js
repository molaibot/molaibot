const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'reset',
    description: 'Reset the amount of mCoins a user has!',
    usage: '<@user>',
    cooldown: 1,
    run: async(client, message, args, profileData) => {
      if (message.member.id != "763767239018938368") return message.channel.send(`Sorry only **MTGSquad** can run this command 😔`);
      let resetUser = args[0];

        if(!resetUser) {
          message.channel.send('Mention a user please!');
        }

        await profileModel.findOneAndUpdate(
            {
              userID: message.mentions.users.first().id,
            },
            {
              $set: {
                mCoins: 1500,
                bank: 0,
              },
            }
          );

         message.channel.send(`I Successfully Reset ${message.mentions.users.first()}'s Balance!`) 
          
    },
}