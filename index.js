require('module-alias/register');
require('./utils/inlinereplies');
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

mongoose.set('useCreateIndex', true);
mongoose
	.connect(mongodb, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log('Connected To The MongoDB Database!');
	})
	.catch((err) => {
		console.log(err);
	});

client.once('ready', async () => {
	console.log(`Logged In As ${client.user.tag}!`);
	client.user.setPresence({
		activity: { name: 'm/help | bot.molai.dev' },
		status: 'dnd',
	});

	const clientDetails = {
		guilds: client.guilds.cache.size,
		users: client.users.cache.size,
		channels: client.channels.cache.size,
	};
	//website

	const app = express();

	const port = 25574;

	app.set('view engine', 'ejs');

	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, 'pages/landingPage.html'));
	});

	app.get('/commands', (req, res) => {
		const commands = getCommands();
		res.status(200).render('commands', { commands });
	});

	app.get('/support', (req, res) => {
		res.sendFile(path.join(__dirname, 'pages/support.html'));
	});

	app.get('/invite', (req, res) =>{
		res.redirect("https://discord.com/oauth2/authorize?client_id=807509478408847360&permissions=8&scope=bot");
	})

	app.get('/api/statistics', (req, res) => {
		res.status(200).send(clientDetails);
	});

	app.get('/api/commands', (req, res) => {
		const commands = getCommands();
		res.status(200).send(commands);
	});

	app.get('/api', (req, res) => {
		const data = {
			commands: 'https://molaibot.ml/api/commands',
			information: 'https://molaibot.ml/api/info',
		};

		res.status(200).send(data);
	});

	app.listen(port, () => console.log(`Website Listening On Port ${port}!`));

	await console.log('Important data:');
	await console.log(clientDetails);
});

client.on('guildCreate', (guild) => {
	const bot = client.user;

	const onJoinChannel = client.channels.cache.get('833902174115069972');

	const onJoinEmbed = new Discord.MessageEmbed()
		.setTitle(':clap: New Server Join! :clap: ')
		.addField('Guild', '```' + guild.name + '```')
		.addField('Server Region', '```' + guild.region + '```', true)
		.addField('Guild ID', '```' + guild.id + '```', true)
		.addField('Guild Owner ID', '```' + guild.ownerID + '```', true)
		.addField('Guild Members', '```' + guild.memberCount + '```', true)
		.addField(
			'When Joined',
			'```' + moment(bot.joinedAt).format('llll') + '```',
			true
		);

	onJoinChannel.send(onJoinEmbed);
});

client.on('guildDelete', (guild) => {
	const onLeaveChannel = client.channels.cache.get('833903791321120858');

	const onLeaveEmbed = new Discord.MessageEmbed()
		.setTitle(':cry: MolaiBOT Kicked :cry:')
		.addField('Guild', '```' + guild.name + '```')
		.addField('Server Region', '```' + guild.region + '```', true)
		.addField('Guild ID', '```' + guild.id + '```', true)
		.addField('Guild Owner ID', '```' + guild.ownerID + '```', true)
		.addField('Guild Members', '```' + guild.memberCount + '```', true);

	onLeaveChannel.send(onLeaveEmbed);
});

client.on('message', async (message) => {
	if (message.author.bot) return;

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
