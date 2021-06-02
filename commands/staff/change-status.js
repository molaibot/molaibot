const e = require('../../utils/embeds');
module.exports = {
  name: 'change-status',
  description: 'Change the bots custom status',
  usage: '<status>',
  run: async(client, message, args) => {
      if(message.member.id !== '763767239018938368') { 
        e.error('Owner Only Command!', 'Only molai.dev#6149 can run this command.', message);
      }


      const newStatus = args.slice(0).join(" ");

      if(!newStatus) {
        e.error('You did not provide a new status!', 'Please provide a new custom status for the bot.', message);
      }

      client.user.setActivity(newStatus, { type: "WATCHING" }).then(
          e.embed('Status Changed!', `I successfully changed my status to: ${newStatus}.`)
      );
  }
}