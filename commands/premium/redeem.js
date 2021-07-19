const { codes } = require('../../premium-codes');
const premiumGuild = require('../../models/premium-guild');
const embed = require('../../utils/embeds');
module.exports = {
	name: 'redeem',
	description: 'Redeem a MolaiBOT Premium Code',
	usage: '<code>',
	run: async (client, message, args) => {
		const userCode = args.slice(0).join(' ');

		codes.forEach(async (code) => {
			if (code.useCode === userCode) {
				await premiumGuild.findOne(
					{ Guild: message.guild.id },
					async (err, data) => {
						if (data)
							return embed.error(
								'You seem to already have premium!',
								'If its not permanant, claim this code after your current subscription ends.',
								message
							);

						embed.titleOnly(
							'You successfully claimed the MolaiBOT Premium Code!',
							message
						);
						await premiumGuild.create({
							Guild: message.guild.id,
							Expire: code.expire,
							Permanant: code.permanant,
						})(async () => {
							const index = codes.indexOf(code);
							if (index > -1) {
								codes.splice(index, 1);
							}
						});
					}
				);
			}
		});
	},
};
