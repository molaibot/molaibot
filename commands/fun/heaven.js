const Discord = require("discord.js");
const Color = "RANDOM"
const red = "#ff04a9"

module.exports = {
  name: "heaven",
  usage: "heaven <member>",
  description: "the legends",
  run: async (client, message, args) => {




      let Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        if (!Member) return message.channel.send(`Invalid User!`);

        let Embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setImage(`https://vacefron.nl/api/heaven?user=${Member.user.displayAvatarURL()}`)


        return message.channel.send(Embed);







  }
}