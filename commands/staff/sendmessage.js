const { Client, Message, MessageEmbed } = require('discord.js');
const embed = require('../../utils/embeds');
const e = require('../../utils/embeds.json');
module.exports = {
  name: 'sendmessage',
  description: 'send a message to a user',
  /**
   * @param {Message} message
   * @param {Client} client
   * @param {String[]} args
   */
  run: async(client, message, args) => {
      if(!args[0]) return embed.error("No user provided", "Give me user id so i can send a message", message);
      const msg = args.slice(1).join(" ");
      if(!msg) return embed.error("No msg provided", "gimme a message dummy", message);

      const tousre = new MessageEmbed()
      .setTitle("Message from MolaiBOT Staff")
      .setDescription(msg)
      .setColor(e.color)
      .setFooter(e.footer);

    client.users.cache.get(args[0]).send({ embeds: [tousre] }).then(() => embed.embed(`You sent a message to: ${client.users.cache.get(args[0]).tag}`, msg, message));
  }
}