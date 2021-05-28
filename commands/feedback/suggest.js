const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'suggest',
  description: 'Suggest a feature',
  usage: '<suggestion>',
  run: async(client, message, args, e) => {
      const sc = client.channels.cache.get("847586623763775500")

      const s = args[0];

      const embed1 = new MessageEmbed()
      .setAuthor(message.author.tag)
      .setTitle(`Suggestion From ${message.author.tag}`)
      .setDescription(s)
      .setFooter(e.footer)
      .setColor(e.color)
      .setTimestamp();

      const embed2 = new MessageEmbed()
      .setAuthor(message.author.tag)
      .setTitle(`Your suggestion has been sent!`)
      .setFooter(e.footer)
      .setColor(e.color)
      .setTimestamp();

      message.author.send(embed2).then(
          sc.send(embed1)
      );
  }
}