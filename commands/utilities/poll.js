const { MessageEmbed, TeamMember } = require('discord.js')

module.exports = {
    name: "poll",
    description: "Start a new poll!",
    aliases: ['newpoll'],
    run: async(client, message, args) => {
        // CHECK IF YOUSER HAS PERMS
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Only **Administrators** can use this command.');


        let channelID = message.mentions.channels.first()
        let theDescription = args.slice(1).join(" ")

        if(!channelID) return message.reply("Please specify a channekl you want the poll to be in!")
        if(!theDescription) return message.reply("Please specify a description/question for the poll!")

        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("💭 New Poll!")
        .setDescription(theDescription)
        .setFooter("Poll started by: "+ message.author.username +'#'+ message.author.discriminator) //optional

        let msgEmbed = await channelID.send(embed)
        await msgEmbed.react('✅') //👎👍
        await msgEmbed.react('❌')
    }
}