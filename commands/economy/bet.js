const { randomInt } = require('../../utils/randomInt');
const { MessageEmbed } = require('discord.js');
const profileModel = require('../../models/profileSchema');
const e = require('../../utils/embeds.json');
module.exports = {
  name: 'bet',
  description: 'Have a bet against our bot!',
  usage: '<amount>',
  cooldown: 10000,
  run: async(client, message, args, profileData) => {
    const params = {
      userID: message.author.id
    }

    const amount = args[0];

    const winner = randomInt(1, 2);

    const winBal = amount * 2;

    if(amount > profileData.mCoins) return message.inlineReply('You do not have enough money for this bet. *Make sure you have it in cash*');
    if(amount < 100) return message.inlineReply('Please choose over `100` mCoins for your bet.');

    if(winner === 1) {
      const winEmbed = new MessageEmbed()
      .setColor(e.color)
      .setFooter(e.footer)
      .setTitle('You Won!')
      .setDescription(`You won ${winBal} mCoins!`);

      message.inlineReply(winEmbed)
      await profileModel.findOneAndUpdate(params, {
        $inc: {
          mCoins: winBal,
        },
      })
    }else{
      const loseEmbed = new MessageEmbed()
      .setColor(e.color)
      .setFooter(e.footer)
      .setTitle('You lost!')
      .setDescription(`You lost a total of ${winBal} mCoins!`);

      message.inlineReply(loseEmbed)
      await profileModel.findOneAndUpdate(params, {
        $inc: {
          mCoins: -winBal
        }
      })
    }
  }
}