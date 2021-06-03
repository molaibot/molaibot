const Discord = require('discord.js');
const items = require('../../shopitems')
const inventory = require('../../models/inventory')
const profileSchema = require('../../models/profileSchema')
module.exports = {
	name: 'buy',
	aliases: ['purchase'],
	description: 'Buy something from the shop',
	usage: '<item name>',
	cooldown: 1,
	run: async(client, message, args, profileData) => {
		const m = message;

		if(!args[0]) return m.channel.send('Please specify a item that you want to buy!')
		const itemToBuy = args.slice(0).join(' ').toLowerCase();

		const validItem = !!items.find(
			(val) => val.item.toLowerCase() === itemToBuy
		)

		if(!validItem) return m.channel.send(`The item you tried to purchase isn't available in the shop, please try *m/shop* to list all items in the shop.`)

		const itemPrice = items.find(
			(val) => val.item.toLowerCase() === itemToBuy
		).price;

		const userBalance = await profileData.mCoins;
		if(userBalance < itemPrice) return m.channel.send('You do not have enough mCoins to buy this item')

		const params = {
			Guild: message.guild.id,
			User: message.author.id
		}

		inventory.findOne(params, async(err, data)=>{
			if(data) {
				const hasItem = Object.keys(data.Inventory).includes(itemToBuy)
				if(!hasItem) {
					data.Inventory[itemToBuy] = 1;
				}else{
					data.Inventory[itemToBuy]++;
				}
				await inventory.findOneAndUpdate(params, data);
			}else{
				new inventory({
					Guild: message.guild.id,
					User: message.author.id,
					Inventory: {
						[itemToBuy]: 1
					}
				}).save()
			}

			const BuyEmbed = new Discord.MessageEmbed()
			.setColor('#37393e')
			.setTitle(`You have bought ${itemToBuy} for ${itemPrice} mCoins!`)

			message.channel.send(BuyEmbed)
			await profileSchema.findOneAndUpdate(
				{
					userID: message.author.id
				},
				{
					$inc: {
						mCoins: -itemPrice
					}
				}
			)
		})
	}
}