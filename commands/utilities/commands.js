const fetch = require('node-fetch');
module.exports = {
  name: 'commands',
  description: 'Link to the commands page',
  run: async(client, message, args) => {
    fetch(`https://discord.com/api/v9/channels/${message.channel.id}/messages`, {
        method: "POST",
        body: JSON.stringify({"content":"**Wanna Visit The Commands Page?**",
            "components": [{
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": "Click Me To Visit!",
                        "style": 5,
                         "url": "https://molaibot.ml/commands"
                    }
                ]
    
            }]}),
        headers: {
            "Authorization": `Bot ${client.token}`,
            "Content-Type": "application/json"
        }
    }).then(res => res.json());
  }
}