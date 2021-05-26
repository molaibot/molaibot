const customCommandsModel = require('../../models/customCommandSchema');

module.exports = {
    name: 'create-cmd',
    description: 'Create server-only commands',
    aliases: ['create-command', 'newcommand', 'addcmd'],
    cooldown: 7000,
    run: async(client, message, args, customCommand) => {
        if(message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send('Creating new commands requires you to have the **MANAGE_MESSAGES** permission.');
        
        let msg = message;

        let newCommandName = args[0];
        let newCommandResponse = args.slice(1).join(' ');

        if(!newCommandName) return msg.channel.send('Please Specify A Command Name!');
        if(!newCommandResponse) return msg.channel.send(`Please Specify A Message That The !${newCommandName} Will Respond With! *You can include links for images to send any images that you want.*`)

        try{
            await customCommandsModel.create(
                {
                    serverID: message.guild.id,
                    commandName: newCommandName,
                    commandResponse: newCommandResponse
                }
            ).then(
                message.channel.send(`I Successfully Created A Command Called: ${newCommandName}.`)

            )

            client.modlogs({
                Member: message.author.tag,
                Action: 'New Command',
                Color: 'RED',
                Reason: 'New Command, No Reasoning Involved.'
            }, message)
        }catch(err){
            console.log(err)
        }
    }
}