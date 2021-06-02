const { embed, success, error } = require('@embeds');
const { randomInt } = require('@randomInt');
module.exports = {
  name: '',
  description: '',
  usage: '',
  run: async(client, message, args) => {
      if(message.member.id !== '763767239018938368') return error('Owner Only Command!', 'Only molai.dev#6149 can run this command.', message);


      const newStatus = args.slice(0).join(" ");

      if(!newStatus) return error('You did not provide a new status!', 'Please provide a new custom status for the bot.', message);

      client.user.setActivity(newStatus, { type: "WATCHING" }).then(
          embed('Status Changed!', `I successfully changed my status to: ${newStatus}.`)
      );
  }
}