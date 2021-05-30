const profileModel = require('../../models/profileSchema');
module.exports = {
  name: 'daily',
  description: 'Get daily rewards!',
  //cooldown: 43200000,
  run: async(client, message, args, profileData) => {
    const dailyReward = 1500;

    let newBal = profileData.coins + dailyReward;
    if(profileData > 0) {
      newBal = dailyReward;
    }

    const params = {
        userID: message.author.id
    }

    profileModel.findOneAndUpdate(params, {
        $inc: {
            coins: dailyReward
        }
    }).then(
      message.channel.send(`You claimed your daily rewards for today, You recieved 1500 coins! **Your wallet balance now is: ${newBal}**, come back in 12 hours for more!`)
    );
  }
}