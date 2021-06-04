const Discord = require('discord.js');

module.exports = {
    name: "say",
    description: "Makes the bot say whatever you want!",
    usage: "<message>",
    cooldown: 1,
    run: (client, message, args) => {
        let userMsg = args.slice(0).join(" ");
        
        let sayEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.member.user.displayAvatarURL({dynamic:true}))
        .setTitle(`Message From ${message.author.tag}`)
        .setDescription(userMsg)
        .setTimestamp()
        .setColor('#37393e')
        .setFooter("MolaiBOT - Made By MTGSquad");
        
        if (!userMsg) {
            return message.inlineReply('Specify A Message Please!')
        } else message.inlineReply(sayEmbed)  
    }
}