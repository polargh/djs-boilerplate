// Import dependencies

const { Client, Intents, Collection } = require("discord.js");
const { token } = require("./config.json");
const fs = require("fs");
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES],
});

// Getting commands from 'commands' directory

client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// Event Handlers

client.once("ready", () => {
	console.log("🚀 Connected to Discord Socket!");
	client.user.setActivity(`boilerplate`, { type: "PLAYING" });
});

// Interaction Command Handler.

client.on("interactionCreate", async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction, client);
		console.log("🔗 " + interaction.user.tag + " ran /" + interaction.commandName);
	} catch (error) {
		console.error(error);
		await interaction.reply({
			content: "an error has occured",
			ephemeral: true,
		});
	}
});

// Login to the Client using the token in 'config.json'

client.login(token);
