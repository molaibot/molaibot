module.exports = async (client) => {
	console.log(`Logged In As ${client.user.tag}!`);
	client.user.setPresence({
		activity: { name: 'm/help | bot.molai.dev' },
		status: 'dnd',
	});

	const clientDetails = {
		guilds: client.guilds.cache.size,
		users: client.users.cache.size,
		channels: client.channels.cache.size,
	};

	client.slashes = new Discord.Collection();
  	const commands = fs
    .readdirSync(`${__dirname}/../slash-commands`)
    .filter((comd) => comd.endsWith(".js"));
  //Makes sure there are commands so it doesn't error
  if (commands.length) {
    commands.forEach((command) => {
      const cmd = require(`${__dirname}/../commands-slash/${command}`);

      if (!cmd.name || !cmd.description || !cmd.run) return;

      client.guilds.cache.get("807514218772430910").commands.create(cmd);
      client.slashes.set(cmd.name, cmd);
    });
  }

	/**
	 * const app = express();

	const port = 25574;

	app.set('view engine', 'ejs');

	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, 'pages/landingPage.html'));
	});

	app.get('/commands', (req, res) => {
		const commands = getCommands();
		res.status(200).render('commands', { commands });
	});

	app.get('/support', (req, res) => {
		res.sendFile(path.join(__dirname, 'pages/support.html'));
	});

	app.get('/invite', (req, res) =>{
		res.redirect("https://discord.com/oauth2/authorize?client_id=807509478408847360&permissions=8&scope=bot");
	});

	app.get('/donate', (req, res)=>{
		res.redirect("https://www.paypal.com/donate/?hosted_button_id=AJF5YCNY57CNW")
	});

	app.get('/api/statistics', (req, res) => {
		res.status(200).send(clientDetails);
	});

	app.get('/api/commands', (req, res) => {
		const commands = getCommands();
		res.status(200).send(commands);
	});

	app.get('/api', (req, res) => {
		const data = {
			commands: 'https://molaibot.ml/api/commands',
			information: 'https://molaibot.ml/api/info',
		};

		res.status(200).send(data);
	});

	app.listen(port, () => console.log(`Website Listening On Port ${port}!`));

	await console.log('Important data:');
	 */
	await console.log(clientDetails);
};
