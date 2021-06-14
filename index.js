require('module-alias/register');
//require('./utils/inlinereplies');
const Discord = require('discord.js'),
	{ prefix, token, mongodb } = require('./config2.json'),
	mongoose = require('mongoose'),
	moment = require('moment'),
	ms = require('ms'),
	express = require('express'),
	path = require('path'),
	{ getCommands } = require('./utils/index'),
	client = new Discord.Client({
		allowedMentions: {
			// set repliedUser value to `false` to turn off the mention by default
			repliedUser: false,
		},
	}),
	embed = require('./utils/embeds'),
	// for the currency stuff
	profileModel = require('./models/profileSchema'),
	// Our beautiful custom commands system
	customCommandsModel = require('./models/customCommandSchema'),
	afkSchema = require('./models/afkSchema'),
	// premium shit

	premiumGuild = require('./models/premium-guild');

// Collections

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
Cooldown = new Discord.Collection();

// functions
client.getCmds = getCommands();

// modlogs
const modlogs = require('./models/modlogs');
client.modlogs = async function ({ Member, Action, Color, Reason }, message) {
	const data = await modlogs.findOne({ Guild: message.guild.id });

	if (!data) return;

	const channel = message.guild.channels.cache.get(data.Channel);
	const logsEmbed = new Discord.MessageEmbed()
		.setColor(Color)
		.setDescription(`Reason: ${Reason}`)
		.addField('Member', `${Member}`)
		.setTitle(`Action: ${Action}`);

	channel.send(logsEmbed);
};

/*
ModLogs end
*/

// Embeds so i don't have to remember the hex code
let e = require('./utils/embeds.json');

const cmdHandler = ['command'];
// Run the command loader
cmdHandler.forEach((handler) => {
	require(`./handlers/${handler}`)(client);
});

require('./events/mongooseConnect')(mongodb);

client.once('ready', async () => {
	require('./events/ready')(client);
});

client.on('guildCreate', (guild) => {
	require('./events/guildCreate')(guild);
});

client.on('guildDelete', (guild) => {
	require('./events/guildDelete')(guild);
});

client.on('guildMemberAdd', (member) => {
	require('./events/guildMemberAdd')(client, member);
});

client.on('guildMemberRemove', (member) => {
	require('./events/guildMemberRemove')(client, member);
});

client.on('interaction', async(...args)=>{
	require('./events/interaction')(...args, client);
})

client.on('message', async (message) => {
	if (message.author.bot) return;

	if(message.mentions.users.first() === client.user) return embed.embed("Hello! I'm MolaiBOT!", "My Prefix: `m/`, To get started, please use `m/help`. Thanks For Adding Me!", message)

	const pings = message.mentions.users.first();

	if (pings && message.author.id !== pings.id) {
		await afkSchema.findOne({ User: pings.id }, async (err, data) => {
			if (data)
				return embed.error(
					'The User is afk!',
					`${pings.tag} seems to be afk with the reason set to: ${data.Reason}`,
					message
				);
		});
	}

	if (!message.guild) return;
	if (!message.content.startsWith(prefix)) return;

	// If message.member is uncached, cache it.
	if (!message.member)
		message.member = await message.guild.fetchMember(message);

	let profileData;
	try {
		profileData = await profileModel.findOne({ userID: message.author.id });
		if (!profileData) {
			let profile = await profileModel.create({
				userID: message.author.id,
				serverID: message.guild.id,
				mCoins: 1500,
				bank: 0,
			});
		}
	} catch (err) {
		console.log(err);
	}

	let customCommand;
	try {
		customCommand = await customCommandsModel.findOne({
			serverID: message.guild.id,
			commandName: message.content.slice(prefix.length),
		});
	} catch (err) {
		console.log(err);
	}

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	// Get the command
	let command = client.commands.get(cmd);
	// If none is found, try to find it by alias
	if (!command) command = client.commands.get(client.aliases.get(cmd));
	// If a command is finally found, run the command
	if (customCommand && customCommand.commandResponse) {
		message.channel.send(customCommand.commandResponse);
	}

	message.author.bal = await profileData.mCoins;
	message.author.bank = await profileData.bank;

	if (command) {
		if (command.premium) {
			premiumGuild.findOne({ Guild: message.guild.id }, async (err, data) => {
				if (!data)
					return embed.error(
						'This is a premium command!',
						"The server you're in doesn't seem to have premium.",
						message
					);

				if (!data.Permanant && Date.now() > data.Expire) {
					data
						.delete()
						.then(
							embed.error(
								'The premium membership has ended!',
								'The premium membership for the server has ended, please contact molaibot staff to get it renewed.',
								message
							)
						);
				}

				if (command.cooldown) {
					if (Cooldown.has(`${command.name}${message.author.id}`))
						return message.channel.send(
							`Woah, you are being way too quick, you're on a \`${ms(
								Cooldown.get(`${command.name}${message.author.id}`) -
									Date.now(),
								{ long: true }
							)}\` cooldown.`
						);
					command.run(client, message, args, profileData, customCommandsModel);
					Cooldown.set(
						`${command.name}${message.author.id}`,
						Date.now() + command.cooldown
					);
					setTimeout(() => {
						Cooldown.delete(`${command.name}${message.author.id}`);
					}, command.cooldown);
				} else if (!cooldown && !command.premium) {
					command.run(client, message, args, profileData, customCommand);
				}
			});
		} else command.run(client, message, args, profileData, customCommand);
	}
});

client.login(token);
