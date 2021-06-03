const { MessageEmbed } = require('discord.js');
const premium = require('../../models/premium');
const embed = require('../../utils/embeds');
const e = require('../../utils/embeds.json');
module.exports = {
  name: 'premium-user-add',
  description: 'Add a user to molaibot premium',
  aliases: ["add-user"],
  cooldown: 1,
  run: async(client, message, args) => {
    const memberEmbed = new MessageEmbed()
    .setColor(e.color)
    .setFooter(e.footer)
    .setTitle('You just got molaibot premium')
    .setDescription('Congratulations!');


      if(message.member.id !== '763767239018938368') {
          embed.error("You aren't my owner", "You don't seem to have permissions to use this command.", message);
      }

      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

      if(!member) {
          embed.error("Please provide a member", "Please provide a member so i can give them a premium membership.", message);
      }

      premium.findOne({
          User: member.id
      }, async(data, err)=>{
          if(data) {
              embed.error("This user already is a premium member", "Looks like they already have a premium membership.", message);
          }

        new premium({
            User: member.id
        }).save();
        return embed.embed("The Member Now Has Premium!", "You just gave a user premium!", message).then(
            

            member.send(memberEmbed)
        );
      })


  }
}