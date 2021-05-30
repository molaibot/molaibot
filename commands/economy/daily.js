const { MessageEmbed } = require('discord.js');
const profileModel = require('../../models/profileSchema');
module.exports = {
  name: 'daily',
  description: 'Get daily rewards!',
  //cooldown: 43200000,
  run: async(client, message, args, profileData) => {
    const dailyReward = 1500;

    let newBal = profileData.coins + dailyReward;

    const params = {
        userID: message.author.id
    }

    try{
    profileModel.findOneAndUpdate(params, {
        $inc: {
            coins: dailyReward
        }
    })
    if(profileData.coins = 0) {
      message.channel.send(`You claimed your rewards for today, come back in 12 hours! Your wallet balance is: **1500**.`);
    } else {
    message.channel.send(`You claimed your rewards for today, come back in 12 hours! Your wallet balance is: **${newBal}**.`);
    }
  }catch(err){
    console.log(err)
    const errEmbed = new MessageEmbed()
    .setColor('#37393e')
    .setTitle('Error!')
    .setDescription(err);

    message.channel.send(errEmbed);
  }
  }
}