const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with the ping of the bot!"),
	async execute(interaction, client) {
		const Embed = new MessageEmbed()
			.setColor("#2F3136")
			.setTitle(":ping_pong: Pong!")
			.setDescription(`The ping of the bot is ${Math.round(client.ws.ping)}ms`)
			.setFooter("© neo");
		await interaction.reply({ embeds: [Embed] });
	},
};
