const Discord = require('discord.js');

module.exports = {
    name: "molaibot",
    aliases: ['mstats'],
    description: "Stats About MolaiBOT.",
    run: (client, message, args) => {
        let mStatsEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.member.user.displayAvatarURL({dynamic:true}))
        .setColor('#37393e')
        .setTitle('Stats For MolaiBOT')
        .setDescription(`MolaiBOT Is Currently In ${client.guilds.cache.size} Servers & Has ${client.guilds.cache.reduce((c, g) => c + g.memberCount, 0)} Users!`)
        .setTimestamp()
        .setFooter('MolaiBOT - Made By MTGSquad')

        message.channel.send(mStatsEmbed);
    }
}