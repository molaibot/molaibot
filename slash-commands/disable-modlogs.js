const { CommandInteraction, MessageEmbed } = require("discord.js");
const modlogs = require('../models/modlogs');
const e = require('../utils/embeds.json');
module.exports = {
    name: "disable-modlogs",
    description: "Disable modlogs",
    /**
     * @param {CommandInteraction} command
     */
    run: async(client, command) => {
        command.defer();

        const errrr = new MessageEmbed()
        .setTitle("You don't have the `MANAGE_GUILD` permission.")
        .setFooter(e.footer)
        .setColor(e.errColor)
        .setTimestamp();

        if(!command.member.permissions.has("MANAGE_GUILD")) return command.editReply({ embeds: [errrr] })

        await modlogs.findOne({ Guild: command.guild.id }, async(err, data) => {
            if(err) return console.log(err);

            const noData = new MessageEmbed()
            .setColor(e.errColor)
            .setFooter(e.footer)
            .setTitle("Modlogs isn't enabled.")
            .setTimestamp();

            const deleted = new MessageEmbed()
            .setColor(e.color)
            .setFooter(e.footer)
            .setTitle("Successfully disabled modlogs!")
            .setTimestamp();

            if(!data) return command.editReply({ embeds: [noData] });

            if(data) {
                data.delete().then(() => command.editReply({ embeds: [deleted] }))
            }
        });
    }
}