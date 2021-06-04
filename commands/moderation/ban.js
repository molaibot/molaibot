const Discord = require('discord.js')

module.exports = {
    name: "ban",
    description: "Bans A Member From The Guild.",
    usage: "<@user>",
    aliases: ['b'],
    cooldown: 1,
    run: (client, message, args) => {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.inlineReply("You don't have permission to ban members.");
        let toBan = message.mentions.members.first();
        let reason = args.slice(1).join(" ");
        if(!args[0]) return message.inlineReply('Please mention someone to bann');
        if(!toBan) return message.inlineReply(`${args[0]} is not a member.`);
        if(!reason) return message.inlineReply('Specify a reason.');
 
        if(!toBan.bannable){
            return message.inlineReply('<a:CoolX:807041416735621160> I cannot ban someone that is mod/admin. <a:CoolX:807041416735621160>');
        }
 
        if(toBan.bannable){
            let x = new Discord.MessageEmbed()
            .setColor('#37393e')
            .setTitle('Ban')
            .addField('Member Banned', toBan)
            .addField('Banned by', message.author)
            .addField('Reason', reason)
            .setTimestamp()
            .setFooter('MolaiBOT - Made By MTGSquad ~ Command By Awoken');
 
            message.inlineReply(x);
            toBan.ban();

            client.modlogs({
                Member: toBan,
                Action: 'Ban',
                Color: 'RED',
                Reason: reason
            }, message)
        }}
    }