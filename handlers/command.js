const { readdirSync } = require('fs');
const fs = require('fs');

const ascii = require('ascii-table');

// Create a new Ascii table
let categoryTable = new ascii('Categories');
categoryTable.setHeading('Categories', 'Load status');
let cmdTable = new ascii('Commands');
cmdTable.setHeading('Command', 'Load status');

module.exports = (client) => {
	let dirAmount = 0;
	let totalCmdAmount = 0;
	readdirSync('./commands/').forEach((dir) => {
		dirAmount++;
		let cmdAmount = 0;
		let cmds = [];
		readdirSync(`./commands/${dir}/`).forEach((file) => {
			cmdAmount++; // amount of cmds in that dir
			totalCmdAmount++;
			if (!file.endsWith('js')) return;
			let cmd = require(`../commands/${dir}/${file}`);
			cmds.push(cmd);
		});
		const category = {
			name: dir,
			cmdAmount,
			cmds,
		};
		client.categories.set(dir, category);
		categoryTable.addRow(dir, `✅ -> ${cmdAmount} commands`);
	});
	categoryTable.addRow();
	categoryTable.addRow(`${dirAmount} Catagorys!`, `${totalCmdAmount} Total Commands!`);
	// Read every commands subfolder
	readdirSync('./commands/').forEach((dir) => {
		const listOfSubcommands = readdirSync(`./commands/${dir}/`).filter((file) =>
			fs.lstatSync(`./commands/${dir}/${file}`).isDirectory()
		); // filters so that it only has folders // gets a list of folders with sub commands
		listOfSubcommands.forEach((subcommand) => {
			console.log(listOfSubcommands);
			console.log(subcommand);
			const subcommands = readdirSync(`./commands/${dir}/${subcommand}/`); // get a list of the sub commands
			for (let command of subcommands) {
				let pull = require(`../commands/${dir}/${subcommand}/${command}`);
				if (command == 'about.js' && pull.name) {
					client.commands.set(pull.name, pull);
				} else if (pull.name && pull.description) {
					client.commands.set(subcommand + ' ' + pull.name, pull);
					cmdTable.addRow(command, `✅  -> sub-command of ${subcommand}`);
				} else if (!pull.description) {
					cmdTable.addRow(
						command,
						`❌  -> missing a description, or the description is not a string. sub-command of ${subcommand}`
					);
				} else if (!pull.name) {
					cmdTable.addRow(
						command,
						`❌  -> missing a name, or the name is not a string. sub-command of ${subcommand}`
					);
					continue;
				}

				// If there's an aliases key, read the aliases.
				if (pull.aliases && Array.isArray(pull.aliases)) {
					pull.aliases.forEach((alias) =>
						client.aliases.set(subcommand + ' ' + alias, subcommand + ' ' + pull.name)
					);
				} else if (pull.aliases && Array.isArray(pull.aliases)) {
					pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
				}
			}
		});
		// Filter so we only have .js command files
		const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith('.js'));

		// Loop over the commands, and add all of them to a collection
		// If there's no name found, prevent it from returning an error,
		// By using a cross in the table we made.
		for (let file of commands) {
			let pull = require(`../commands/${dir}/${file}`);

			if (!pull.description) {
				cmdTable.addRow(
					file,
					`❌  -> missing a description, or the description is not a string. catagory: ${dir}`
				);
			} else if (!pull.name) {
				cmdTable.addRow(file, `❌  -> missing a name, or the name is not a string. catagory: ${dir}`);
				continue;
			} else if (pull.name) {
				client.commands.set(pull.name, pull);
				cmdTable.addRow(file, `✅  -> ${dir}`);
			}
			// If there's an aliases key, read the aliases.
			if (pull.aliases && Array.isArray(pull.aliases))
				pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
		}
	});
	// Log the table
	console.log(cmdTable.toString());
	console.log(categoryTable.toString());
};