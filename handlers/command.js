const glob = require("glob").sync;

const ascii = require("ascii-table");

// Create a new Ascii table
let table = new ascii("Commands");
table.setHeading("Command", "Load status");

module.exports = (client) => {
  // Loop over the commands, and add all of them to a collection
  // If there's no name found, prevent it from returning an error,
  // By using a cross in the table we made.
  glob("./commands/**/*.js").map((file) => {
    let pull = require(`.${file}`);

    if (pull.name instanceof String) {
      client.commands.set(pull.name, pull);
      table.addRow(file, "✅");
    } else {
      table.addRow(
        file,
        `❌  -> missing a ${file
          .split("/")
          [file.split("/").length - 1].replace(".js", "")}.name, or ${file
          .split("/")
          [file.split("/").length - 1].replace(
            ".js",
            ""
          )}.name is not a string.`
      );
      return;
    }

    // If there's an aliases key, read the aliases.
    if (pull.aliases && Array.isArray(pull.aliases))
      pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
  });
  // Log the table
  console.log(table.toString());
};

/**
 * This is the basic command layout
 * module.exports = {
 *  name: "Command name",
 *  aliases: ["array", "of", "aliases"]
 *  category: "Category name",
 *  description: "Command description"
 *  usage: "[args input]",
 *  run: (client, message, args) => {
 *      The code in here to execute
 *  }
 * }
*/