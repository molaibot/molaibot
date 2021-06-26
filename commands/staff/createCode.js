const e = require('../../utils/embeds');
const { codes } = require('../../premium-codes');
const day = require('dayjs');
module.exports = {
  name: 'createCode',
  description: 'create a molaibot premium code',
  aliases: ["newcode", "createthecode", "molaibotcode-new"],
  run: async(client, message, args) => {
    if(message.member.id !== "763767239018938368") return e.error("You aren't my owner", "You aren't my owner man, too bad you can't run special commands!", message);

    const expiry = day(args[1]).valueOf();

    if(!args[1]) {
        codes.push(
            {
                permanant: true,
                expire: 0,
                useCode: args[0]
            }
        ).then(() => e.titleOnly("Successfully created the premium code. `It is permanant!`", message))
    } else {
        codes.push(
            {
                permanant: false,
                expire: expiry,
                useCode: args[0]
            }
        ).then(() => e.titleOnly("Successfully created the premium code. `It is not permanant!`", message));
    }

  }
}