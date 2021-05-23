const profileModel = require("../../models/profileSchema");


module.exports = {
  name: "beg",
  aliases: [],
  description: "Beg for mCoins!",
  cooldown: 5000,
  run: async(client, message, args, profileData) => {
    const randomNumber = Math.floor(Math.random() * 500) + 1;
    const response = await profileModel.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
        $inc: {
          mCoins: randomNumber,
        },
      }
    );
    return message.channel.send(`${message.author.username}, you begged and received **${randomNumber} mCoins!**`);
  },
};