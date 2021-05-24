const Discord = require('discord.js');
const inventory = require('../../models/inventory');
module.exports = {
	name: 'inventory',
	aliases: ['inv'],
	description: "List your inventory, and see the purchases you've made!",
	run: async(client, message, args, profileData) => {
		inventory.findOne({
			Guild: message.guild.id,
			User: message.author.id
		}, async(err, data) => {
			if(!data){
				let emptyEmbed = new Discord.MessageEmbed()
				.setTitle('Your inventory is currently empty!')
				.setColor('#37393e')

				message.channel.send(emptyEmbed);
			}

			const inv = [];

			const mappedData = Object.keys(data.Inventory).map((key) => {
				return inv.push(
					{name: `${key.toUpperCase()}`, value: `You have ${data.Inventory[key]} of this item`}
				)
			});

			let invEmbed = new Discord.MessageEmbed()
			.setTitle(`${message.author.username}'s Inventory`)
			.addFields(inv)
			.setTimestamp()
			.setColor('#37393e')
			.setFooter('MolaiBOT - Made By MTGSquad')

			message.channel.send(invEmbed);
		})
	}
}