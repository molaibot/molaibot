const Discord = require("discord.js");
const Color = "RANDOM"
const red = "#ff04a9"


module.exports = {
  name: "wasted",
  usage: "wasted",
  description: "wasted",
  run: async (client, message, args) => {




 let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
            const embed = new   Discord.MessageEmbed()
            .setColor('#37393e')
                .setImage(`https://some-random-api.ml/canvas/wasted?avatar=${user.user.displayAvatarURL({ format: 'png' })}`)

    
            await message.channel.send(embed)









  }
}