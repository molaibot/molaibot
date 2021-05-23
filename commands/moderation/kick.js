const Discord = require('discord.js')

module.exports = {
    name: "kick",
    description: "Kicks A Member From The Guild.",
    usage: "<@user>",
    aliases: ['k'],
    run: (client, message, args) => {
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don't have permission to kick members.");
        let toKick = message.mentions.members.first();
        let reason = args.slice(1).join(" ");
        if(!args[0]) return message.channel.send('Please mention someone to kick.');
        if(!toKick) return message.channel.send(`${args[0]} is not a member.`);
        if(!reason) return message.channel.send('Specify a reason.');
 
        if(!toKick.kickable){
            return message.channel.send('<a:CoolX:807041416735621160> I cannot kick someone that is mod/admin. <a:CoolX:807041416735621160>');
        }
 
        if(toKick.kickable){
            let kickEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Kick')
            .addField('Member Kicked', toKick)
            .addField('Kicked by', message.author)
            .addField('Reason', reason)
            .setTimestamp()
            .setFooter('MolaiBOT - Made By MTGSquad ~ Command By Awoken');
 
            message.channel.send(kickEmbed)
            toKick.kick();

            client.modlogs({
                Member: toKick,
                Action: 'Kick',
                Color: 'RED',
                Reason: reason
            }, message)
        }}
    }