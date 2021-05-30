const Discord = require('discord.js');

module.exports = {
    name: "say",
    description: "Makes the bot say whatever you want!",
    usage: "<message>",
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
            return message.channel.send('Specify A Message Please!')
        } else message.channel.send(sayEmbed)  
    }
}