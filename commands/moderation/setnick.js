const embed = require('../../utils/embeds');
module.exports = {
  name: 'setnick',
  aliases: ['setnickname'],
  description: "Set a user's nickname",
  usage: '<@user> <nickname>',
  run: async(client, message, args) => {
      const member = message.mentions.members.first();
      const nickname = args.slice(1).join(" ");

      if(!message.member.permissions.has('MANAGE_NICKNAMES')) return embed.error('Error', 'You do not have the **MANAGE_MESSAGES** permission');

      if(!member) return embed.error('No member mentioned', 'Please mention a member to set their nickname', message);

      if(!nickname) return embed.error('No nickname provided', 'You did not provide a new nickname', message);

      try{
          member.setNickname(nickname);
          embed.success('Successfully changed their nick!', `You changed their nickname to: ${nickname}`, message);
      }catch(err) {
          embed.error('Error:', err, message);
          console.log(err);
      }
  }
}