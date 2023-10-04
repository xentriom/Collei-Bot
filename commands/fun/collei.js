const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('collei')
        .setDescription('Provides information about Collei.'),
    async execute(interaction) {
        await interaction.reply(`This command is under development.`);
    },
};