const { MessageEmbed } = require('discord.js');
const premium = require('../../models/premium');
const embed = require('../../utils/embeds');
const e = require('../../utils/embeds.json');
module.exports = {
  name: 'premium-user-rm',
  description: 'Remove a user from molaibot premium',
  aliases: ["rm-user"],
  cooldown: 1,
  run: async(client, message, args) => {
    const memberEmbed = new MessageEmbed()
    .setColor(e.color)
    .setFooter(e.footer)
    .setTitle('Your Membership Has Ended.')
    .setDescription('Your Membership was terminated. Sad to see you go.');

      
    if(message.member.id !== '763767239018938368') return embed.error("You aren't my owner", "You don't seem to have permissions to use this command.", message);

      const member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

      if(!member) {
          embed.error("Please provide a member", "Please provide a member so i can give them a premium membership.");
      }

      premium.findOne({
          User: member.id
      }, async(err, data) => {
        if(!data) {
            embed.error("The user doesn't have premium", "They don't have premium, what are you going to take away 🤣", message);
        }
        data.delete();
        embed.embed('Removed Their Premium Membership', 'I successfully terminated their membership.', message).then(
            member.send(memberEmbed)
        )
      });
  }
}