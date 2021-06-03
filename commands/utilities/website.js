const fetch = require('node-fetch');
module.exports = {
  name: 'website',
  description: 'Link to the molaibot website',
  cooldown: 1,
  run: async(client, message, args) => {
    fetch(`https://discord.com/api/v9/channels/${message.channel.id}/messages`, {
        method: "POST",
        body: JSON.stringify({"content":"**Wanna Visit The Website?**",
            "components": [{
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": "Click Me To Visit",
                        "style": 5,
                         "url": "https://bot.molai.dev/"
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