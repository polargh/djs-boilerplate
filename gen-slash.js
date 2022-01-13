// Dependencies

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { token, client_id, guild_id } = require("./config.json");
const fs = require("fs");

// Command Files

const commands = [];
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

// Getting the files lol

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Importing REST as a constant (v9)

const rest = new REST({ version: "9" }).setToken(token);

// Registering (/) Slash Commands

(async () => {
	try {
		console.log("⏰ Started refreshing slash commands.");

		await rest.put(Routes.applicationGuildCommands(client_id, guild_id), { body: commands });

		console.log("🚀 Reloaded slash commands!");
	} catch (error) {
		console.error("🛑 An error has occured:" + error);
	}
})();
