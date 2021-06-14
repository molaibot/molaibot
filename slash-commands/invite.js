const { slashEmbed } = require('../utils/embeds')

module.exports = {
  name: "invite",
  description: "Invite MolaiBOT",
  run: async (client, command) => {
    command.defer()
    
    slashEmbed("MolaiBOT", "You can invite molaibot here: `https://dsc.gg/molaibot`", command);
  },
};