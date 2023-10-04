const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        try {
            const pingEmbed = new EmbedBuilder()
                .setColor(0xA0B06C)
                .setDescription(`**Pong!** 🪃
Latency is **${Date.now() - interaction.createdTimestamp}ms.**
API Latency is **${Math.round(interaction.client.ws.ping)}ms.**`)
            interaction.reply({ embeds: [pingEmbed] });
        }
        catch (error) {
            await interaction.reply({
                content: `An error occured executing this command, <@${xen}> has been notified.`,
                ephemeral: true
            });
            console.log(`Error during Report command: ${error.message}`);
        }
    },
};