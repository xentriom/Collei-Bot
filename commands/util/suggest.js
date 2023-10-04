const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { aCheck } = require('../../emoji.json');
const cSug = process.env['Cult_Suggestion']
const xen = process.env['xentriom']

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Provides information about the user.')
        .addStringOption(option =>
            option.setName('content')
                .setDescription('Content for the suggestion')
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('incognito')
                .setDescription(`Determine whether it's anonymous or not`)
                .setRequired(true)),
    async execute(interaction) {
        try {
            const suggestion = interaction.options.getString('content');
            const isIncognito = interaction.options.getBoolean(`incognito`);
            const channel = interaction.client.channels.cache.get(cSug);

            var header = `Suggestion from `;
            if (isIncognito) { header += `anonymous`; }
            if (!isIncognito) { header += `${interaction.user.tag}`; }

            const suggestionEmbed = new EmbedBuilder()
                .setColor(0xA0B06C)
                .setAuthor({ name: `${header}` })
                .setDescription(suggestion)
            const message = await channel.send({ embeds: [suggestionEmbed] });

            await message.react('👍');
            await message.react('👎');

            await interaction.reply({ content: `${aCheck} Your suggestion has been sent.`, ephemeral: true });
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