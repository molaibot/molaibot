const customCommandsModel = require('../../models/customCommandSchema');

module.exports = {
    name: 'del-cmd',
    cooldown: 7000,
    description: 'Delete a custom command.',
    aliases: ['delete-command', 'delcommand', 'delcmd', 'rmcmd'],
    run: async(client, message, args, customCmdData) => {
        if(message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send('Deleting commands requires you to have the **MANAGE_MESSAGES** permission.');
            
        
        let msg = message;

        let delCommandName = args[0];

        if(!delCommandName) return msg.channel.send('Please Specify A Command Name!');
        
        try{
            await customCommandsModel.findOneAndDelete(
                {
                    serverID: message.guild.id,
                    commandName: delCommandName
                }
            ).then(
                message.channel.send(`I Successfully Deleted A Command Called: ${delCommandName}!`)
            )

            client.modlogs({
                Member: message.author.id,
                Action: 'Command Deleted',
                Color: 'RED',
                Reason: 'Command Deleted, No Reasoning Involved.'
            }, message)
        }catch(err){
            console.log(err)
        }
    } 
}