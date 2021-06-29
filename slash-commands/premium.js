const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const e = require('../utils/embeds.json');
module.exports = {
    name: "premium",
    description: "Request a molaibot premium subscription from the molaibot staff.",
    options: [
        {
            name: "userid",
            description: "Your discord user ID, This is how we will contact you!",
            type: "STRING",
            required: true
        },
        {
            name: "guild",
            description: "Your guild's id",
            type: "STRING",
            required: true
        }
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} command
     */
    run: (client, command) => {
        const guildId = command.options.get("guild").value;
        const username = command.options.get("userid").value;
        const rc = client.channels.cache.get("859558324651425792");

        const rce = new MessageEmbed()
        .setColor(e.color)
        .setTitle("New request!")
        .setFooter(e.footer)
        .setTimestamp()
        .setDescription(`UserID: ${username}, Guild: ${guildId}`);

        rc.send({ embeds: [rce] });

        const usrEmbed = new MessageEmbed()
        .setColor(e.color)
        .setTitle("Successfully submitted your request!")
        .setFooter(e.footer)
        .setTimestamp()
        .setDescription(`If your request is approved, you will recieve a DM telling you that it has been approved and that the guild has been given molaibot premium access.`);
        

        client.users.cache.get(username).send({ embeds: [usrEmbed] })
    }
}