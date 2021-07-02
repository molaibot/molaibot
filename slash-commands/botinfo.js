const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { device, withV, operatingSystem } = require('../utils/os');
const e = require('../utils/embeds.json');
const ms = require('ms');
module.exports = {
    name: "botinfo",
    description: "Get info about molaibot!",
    /**
     * @param {Client} client
     * @param {CommandInteraction} command
     */
    run: (client, command) => {
        command.defer();

        const embed = new MessageEmbed()
      .setAuthor(`MolaiBOT`, client.user.displayAvatarURL())
      .setDescription(
        `[Support Server](https://dsc.gg/devs-gg) — [Invite](https://s.molai.dev/molaibot) — [Vote](https://s.molai.dev/vote4molaibot)`
      )
      .addFields(
        {
          name: `Users`,
          value: `\`\`\`${client.users.cache.size}\`\`\``,
          inline: true,
        },
        {
          name: `Guilds`,
          value: `\`\`\`${client.guilds.cache.size}\`\`\``,
          inline: true,
        },
        {
            name: `Uptime`,
            value: `\`\`\`${ms(client.uptime)}\`\`\``,
            inline: true
        },
        {
            name: `Device`,
            value: `\`\`\`${device()}\`\`\``,
            inline: true,
        },
        {
            name: `Operating System`,
            value: `\`\`\`${operatingSystem()}\`\`\``,
            inline: true
        },
        {
            name: `Running with`,
            value: `\`\`\`${withV()}\`\`\``,
        }
      )
      .setColor(e.color)
      .setFooter("MolaiBOT - Made by MTGSquad", command.user.displayAvatarURL())
      .setTimestamp();

      command.editReply({ embeds: [embed] });
        
    }
}