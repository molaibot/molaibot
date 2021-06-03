const profileModel = require('../../models/profileSchema');
const embed = require('../../utils/embeds');
module.exports = {
  name: 'hourly',
  description: 'Hourly Rewards For Premium Members!',
  premium: true,
  cooldown: 3600000,
  run: async(client, message, args) => {
    const rewards = 750;

    const params = {
        userID: message.author.id
    }

    profileModel.findOneAndUpdate(params, {
        $inc: {
            mCoins: rewards
        }
    }).then(
        embed.embed("You claimed your rewards!", "Come back in an hour for more! *this is a premium-only command*", message)
    );
  }
}