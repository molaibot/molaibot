const Discord = require('discord.js')

module.exports = {
    name: "avatar",
    aliases: ['av'],
    description: "shows the avatar of the user",
    run: (client, message, args) => {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;

        const embed = new Discord.MessageEmbed()
            .setTitle('**Avatar**')
            .setColor('#37393e')
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setTimestamp()
			.setFooter("MolaiBOT - Made By MTGSquad")

        message.channel.send(embed)
    }
}