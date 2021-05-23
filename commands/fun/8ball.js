
const Color = "RANDOM"
const red = "#ff04a9"


const Discord = require('discord.js')
module.exports = {
  name: "8ball",
  aliases: ["magikball"],
  usage: "8Ball <question>",
  description: "Get a stupid answer from Magik Ball",
  run: async (client, message, args) => {
      if(!args[1]) return message.reply("please ask a full question!");
      let replies = ['Yes', 'duh', 'Why not', 'No', 'N O', 'Maybe.....', 'I dont know.... Ask someone else.... ', 'Ask again later', "I honestly hate people like you, always asking me questions, ugh >:("];

      let result = Math.floor((Math.random() * replies.length));
      let question = args.slice(0).join(" ");

      let ballembed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag)
      .setColor(Color)
      .addField("Question", question)
      .addField("Answer", replies[result]);

      message.channel.send(ballembed);
  }
}