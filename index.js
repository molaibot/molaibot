const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, activity, mongodb } = require('./config2.json');
const mongoose = require('mongoose');
const moment = require('moment');
const ms = require('ms');
const express = require('express');
const path = require('path');

const { getCommands } = require('./utils/index')

const client = new Discord.Client();

// for the currency stuff
const profileModel = require('./models/profileSchema');
const { profile } = require('console');

// Our beautiful custom commands system
const customCommandsModel = require('./models/customCommandSchema');

// Collections
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
Cooldown = new Discord.Collection();

// modlogs
const modlogs = require('./models/modlogs');
client.modlogs = async function({ Member, Action, Color, Reason }, message) {
    const data = await modlogs.findOne({ Guild: message.guild.id});

    if(!data) return;

    const channel = message.guild.channels.cache.get(data.Channel);
    const logsEmbed = new Discord.MessageEmbed()
    .setColor(Color)
    .setDescription(`Reason: ${Reason}`)
    .addField('Member', `${Member}`)
    .setTitle(`Action: ${Action}`)

    channel.send(logsEmbed);
}

/*
ModLogs end
*/

const cmdHandler = ["command"];
// Run the command loader
cmdHandler.forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Connected To The MongoDB Database!');
}).catch((err) => {
    console.log(err)
})

client.once('ready', async () => {
	console.log(`Logged In As ${client.user.tag}!`);
	client.user.setActivity(`${activity}`, { type: "LISTENING" });


    const clientDetails = {
        guilds: client.guilds.cache.size,
        users: client.users.cache.size,
        channels: client.channels.cache.size
    }
//website

const app = express();

const port = 3000 || 3001;

app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'pages/landingPage.html'));
});

app.get('/commands', (req, res) => {
    const commands = getCommands();
    res.status(200).render('commands', { commands });
});

app.get('/api/info', (req, res) =>{
    res.status(200).send(clientDetails);
});

app.listen(80);
await console.log('API Server Started.');

await console.log('Important data:');
await console.log(clientDetails);
await console.log('API on http://localhost/')

});

client.on("guildCreate", (guild) => {
    const bot = client.user

        const onJoinChannel = client.channels.cache.get("833902174115069972")

        const onJoinEmbed  = new Discord.MessageEmbed()
        .setTitle(":clap: New Server Join! :clap: ")
        .addField("Guild", "```" + guild.name + "```")
        .addField("Server Region", "```" + guild.region + "```", true)
        .addField("Guild ID", "```" + guild.id + "```", true)
        .addField("Guild Owner ID", "```" + guild.ownerID + "```", true)
        .addField("Guild Members", "```" + guild.memberCount + "```", true)
        .addField("When Joined", "```" + moment(bot.joinedAt).format('llll') + "```", true)

        

        onJoinChannel.send(onJoinEmbed)
});

client.on('guildDelete', (guild) => {
   const onLeaveChannel = client.channels.cache.get("833903791321120858")

		const onLeaveEmbed  = new Discord.MessageEmbed()
		.setTitle(":cry: MolaiBOT Kicked :cry:")
		.addField("Guild", "```" + guild.name + "```")
		.addField("Server Region", "```" + guild.region + "```", true)
		.addField("Guild ID", "```" + guild.id + "```", true)
		.addField("Guild Owner ID", "```" + guild.ownerID + "```", true)
		.addField("Guild Members", "```" + guild.memberCount + "```", true)

		

		onLeaveChannel.send(onLeaveEmbed) 
});

client.on("message", async message => {
   
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    // If message.member is uncached, cache it.
    if (!message.member) message.member = await message.guild.fetchMember(message);

    let profileData;
    try{
        profileData = await profileModel.findOne({ userID: message.author.id });
        if (!profileData) {
            let profile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                mCoins: 1500,
                bank: 0
            });
        }
    }catch(err){
        console.log(err)
    }
    
    let customCommand;
    try{
        customCommand = await customCommandsModel.findOne({ serverID: message.guild.id, commandName: message.content.slice(prefix.length) });
    }catch(err){
        console.log(err)
    }
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    // If a command is finally found, run the command
    if(customCommand && customCommand.commandResponse) return message.channel.send(customCommand.commandResponse);
    
    if (command) {
            if(command.cooldown) {
                if(Cooldown.has(`${command.name}${message.author.id}`)) return message.channel.send(`Woah, you are being way too quick, you're on a \`${ms(Cooldown.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}\` cooldown.`)
                command.run(client, message, args)
                Cooldown.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
                setTimeout(() => {
                  Cooldown.delete(`${command.name}${message.author.id}`)
                }, command.cooldown)
            } else {
              command.run(client, message, args)
            }
}
});

client.login(token);