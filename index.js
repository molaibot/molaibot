require('module-alias/register');

const Discord = require('discord.js'),
	{ token, mongodb } = require('./config.json'),
	defaultprefix = 'm/',
	ownerID = '763767239018938368',
	mongoose = require('mongoose'),
	moment = require('moment'),
	ms = require('ms'),
	path = require('path'),
	{ getCommands } = require('./utils/index'),
	client = new Discord.Client({
		allowedMentions: {
			// set repliedUser value to `false` to turn off the mention by default
			repliedUser: false,
		},
		intents: [
			'GUILDS',
			'GUILD_MESSAGES',
			'GUILD_INVITES',
			'GUILD_PRESENCES',
			'GUILD_MEMBERS',
		],
	}),
	badwords = require('./badWords.js'),
	embed = require('./utils/embeds'),
	// for the currency stuff
	profileModel = require('./models/profileSchema'),
	// Our beautiful custom commands system
	customCommandsModel = require('./models/customCommandSchema'),
	afkSchema = require('./models/afkSchema'),
	// premium shit
	premiumGuild = require('./models/premium-guild'),
	prefixSchema = require('./models/prefix'),
	autoMod = require('./models/automod'),
	e = require('./utils/embeds.json');

// Collections

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
Cooldown = new Discord.Collection();
client.owners = ['763767239018938368'];

// functions
client.getCmds = getCommands();
client.embed = function (t, d, f) {
	const embed = new Discord.MessageEmbed().setColor(e.color);
	if (t) {
		embed.title = t;
	}
	if (d) {
		embed.description = d;
	}
	if (f) {
		embed.footer = f;
	}
	return embed;
};

// modlogs
const modlogs = require('./models/modlogs');
client.modlogs = async function ({ Member, Action, Color, Reason }, message) {
	const data = await modlogs.findOne({ Guild: message.guild.id });

	if (!data) return;

	const channel = message.guild.channels.cache.get(data.Channel);

	let logsEmbed = new Discord.MessageEmbed()
		.setColor(Color)
		.setDescription(`Reason: ${Reason}`)
		.addField('Member', `${Member}`)
		.setTitle(`Action: ${Action}`);

	channel.send({ embeds: [logsEmbed] });
};

client.msgLogs = async function (
	{ Member, Action, OldContent, NewContent },
	newMessage
) {
	const data = await modlogs.findOne({ Guild: newMessage.guild.id });

	if (!data) return;

	const channel = client.channels.cache.get(data.Channel);

	let mlogsEmbed = new Discord.MessageEmbed()
		.setColor('RED')
		.setDescription('MolaiBOT Logs')
		.addField('Old Content', `${OldContent}`)
		.addField('New Content', `${NewContent}`)
		.addField('Member', `${Member}`)
		.setTitle(`Action: ${Action}`);

	channel.send({ embeds: [mlogsEmbed] });
};

/*
ModLogs end
*/

const cmdHandler = ['command'];
// Run the command loader
cmdHandler.forEach((handler) => {
	require(`./handlers/${handler}`)(client);
});

require('./events/mongooseConnect')(mongodb);

// Set guild events
client.once('ready', async () => {
	require('./events/ready')(client);
});

client.on('guildCreate', (guild) => {
	require('./events/guildCreate')(guild, client);
});

client.on('guildDelete', (guild) => {
	require('./events/guildDelete')(guild, client);
});

client.on('guildMemberAdd', (member) => {
	require('./events/guildMemberAdd')(client, member);
});

client.on('guildMemberRemove', (member) => {
	require('./events/guildMemberRemove')(client, member);
});

client.on('interaction', async (...args) => {
	require('./events/interaction')(...args, client);
});

let prefix = defaultprefix;

client.on('messageCreate', async (message) => {
	if (message.author.bot) return;

	badwords.forEach(async (badword) => {
		await autoMod.findOne({ guild: message.guild.id }, async (err, data) => {
			if (!data) return;

			if (data.enabled === true) {
				if (message.content.includes(badword)) {
					embed
						.badWord(
							'Message Deleted.',
							'Your message contained a bad word.',
							'MolaiBOT Auto-Moderation',
							message,
							client
						)
						.then(() =>
							message.delete().then(() =>
								client.modlogs(
									{
										Member: message.author.tag,
										Action: 'Moderation',
										Color: 'RED',
										Reason:
											'Message deleted, because it contained **bad words.**',
									},
									message
								)
							)
						);
				}
			}
		});
	});

	await prefixSchema.findOne(
		{ guildID: message.guild.id },
		async (err, data) => {
			if (!data) {
				await prefixSchema.create({
					guildID: message.guild.id,
					prefix: defaultprefix,
				});
			}

			if (data) prefix = data.prefix;
		}
	);

	if (message.mentions.users.first() === client.user)
		return embed.embed(
			"Hello! I'm MolaiBOT!",
			`My Prefix: \`${prefix}\`, To get started, please use \`${prefix}help\`. Thanks For Adding Me!`,
			message
		);

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
		if (command.owner) {
			if (message.member.id !== ownerID)
				return embed.error(
					"You aren't my owner!",
					"You don't seem to be my owner. Erhh- sorry.",
					message
				);
		}

		if (command.permission) {
			if (!message.member.permissions.has(command.permission))
				return embed.error(
					`You do not have the required permissions!`,
					`This command needs you to have the **${command.permission.toUpperCase()}** permission.`,
					message
				);
		}

		if (command.botPerm) {
			if (!message.guild.me.permissions.has(command.botPerm))
				return embed.error(
					`I don't have the ${command.botPerm} permission!`,
					'Please give me the permissions, it is required for the command to work.',
					message
				);
		}

		if (command.disabled)
			return embed.error(
				'This command is disabled.',
				`The ${command.name.toUpperCase()} command is disabled by **${
					client.users.cache.has(ownerID).tag
				}**`
			);

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
				} else if (
					!cooldown &&
					!command.premium &&
					!command.permission &&
					!command.botPerm &&
					!command.owner
				) {
					command.run(client, message, args, profileData, customCommand);
				}
			});
		} else command.run(client, message, args, profileData, customCommand);
	}
});

// Set message events
client.on('messageDelete', (message) => {
	require('./events/messageDelete')(client, message);
});

client.on('messageUpdate', (oldMessage, newMessage) => {
	require('./events/messageUpdate')(client, oldMessage, newMessage);
});

client.login(token);
