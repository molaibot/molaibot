const Discord = require('discord.js');

module.exports = {
    name: 'balance',
    description: 'Check your account balance!',
    cooldown: 3000,
    usage: '',
    aliases: ['bal'],
    run: (client, message, args, profileData) => {
        let balEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`)
        .setTitle(`${message.author.tag}'s Balance`)
        .setDescription(`Wallet: ${profileData.mCoins} mCoins\nBank: ${profileData.bank} mCoins`)
        .setColor('RANDOM')
        .setTimestamp()
        .setFooter('MolaiBOT - Made By MTGSquad')

        message.channel.send(balEmbed)
    }
}