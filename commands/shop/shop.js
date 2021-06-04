const items = require('../../shopitems');
const Discord = require('discord.js');
module.exports = {
	name: 'shop',
	usage: '',
    aliases: ['store'],
	description: 'List all items available in the shop',
	cooldown: 1,
	run: async(client, message, args) => {
		if(items.length === 0) return message.inlineReply('There are no items available for sale!');

// How tf do i get this to work, in the name of the field it says to me: "undefined", how do i fix it?
			const itemsList = [];
			items.forEach(value => {
				console.log(value.name);
			itemsList.push(
            {name: `${value.item}`, value: `**Price:** ${value.price}\n**Description:** ${value.description}`}
        	)
            });
            

				const shopEmbed = new Discord.MessageEmbed()
				.setColor('#37393e')
				.setFooter('MolaiBOT - Made By MTGSquad')
				.setTitle('Grab Some MolaiBOT Swag')
				.setDescription('MolaiBOT Store, The items below are for listed for sale.')
				.addFields(itemsList)
				.setTimestamp();

		message.inlineReply(shopEmbed);
	}
}