const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const { ButtonStyle, TextInputStyle, ComponentType } = require('discord.js');
const xen = process.env['xentriom']
const pMod = process.env['Personal_Moderator']
const cMod = process.env['Cult_Moderator']

module.exports = {
    data: new SlashCommandBuilder()
        .setName('request')
        .setDescription('Request change to your information.')
        .addStringOption(option =>
            option.setName('edit')
                .setDescription(`Select what you're requesting to edit`)
                .setRequired(true)
                .addChoices(
                    { name: 'Games', value: 'edit_games' },
                    { name: 'Nickname', value: 'edit_nick' },
                )),
    async execute(interaction) {
        try {
            const editChoice = interaction.options.getString('edit');
            const pchannel = interaction.client.channels.cache.get(pMod);
            const cchannel = interaction.client.channels.cache.get(cMod);

            if (editChoice === "edit_games") {
                const gameModal = new ModalBuilder()
                    .setCustomId('modal_game')
                    .setTitle('Game Info Change');
                const typeGame = new TextInputBuilder()
                    .setCustomId('gameInput')
                    .setLabel("Which game is it for?")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Genshin / Starrail / Minecraft')
                    .setRequired(true);
                const typeChange = new TextInputBuilder()
                    .setCustomId('typeInput')
                    .setLabel("What do you want to change?")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('UID / Username / AR / etc.')
                    .setRequired(true);
                const newValue = new TextInputBuilder()
                    .setCustomId('newInput')
                    .setLabel("What is the new value?")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Username => Kylie')
                    .setRequired(true);
                const game1 = new ActionRowBuilder().addComponents(typeGame);
                const game2 = new ActionRowBuilder().addComponents(typeChange);
                const game3 = new ActionRowBuilder().addComponents(newValue);
                gameModal.addComponents(game1, game2, game3);
                interaction.showModal(gameModal);

                const filter = (interaction) => {
                    return interaction.customId === 'modal_game';
                };

                interaction.awaitModalSubmit({ time: 300000, filter })
                    .then(async (interaction) => {
                        const game = interaction.fields.getTextInputValue('gameInput');
                        const info = interaction.fields.getTextInputValue('typeInput');
                        const changed = interaction.fields.getTextInputValue('newInput');

                        const gameEmbed = new EmbedBuilder()
                            .setColor(0xA0B06C)
                            .setTitle(`Info Change Request`)
                            .setDescription(`Game: ${game}\nInfo: ${info}\nNew: ${changed}`)
                            .setFooter({ text: `Sent from ${interaction.user.username}` });

                        pchannel.send({ embeds: [gameEmbed] });
                        interaction.reply(`Your request has been submitted.\nPlease allow some time for the system to update.`);
                    })
                    .catch(err => console.log(`Game Modal Error from ${interaction.user.tag}: ${err.message}`));
            }

            if (editChoice === "edit_nick") {
                const nickModal = new ModalBuilder()
                    .setCustomId('modal_nick')
                    .setTitle('Nickname Change');
                const nickValue = new TextInputBuilder()
                    .setCustomId('nickInput')
                    .setLabel("What is the new nickname?")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('adorluigi')
                    .setRequired(true);
                const nickReason = new TextInputBuilder()
                    .setCustomId('reasonInput')
                    .setLabel("What is the reason for wanting this change?")
                    .setStyle(TextInputStyle.Paragraph)
                    .setPlaceholder(`It's the nickname I use in every game.`)
                    .setRequired(true);
                const nick1 = new ActionRowBuilder().addComponents(nickValue);
                const nick2 = new ActionRowBuilder().addComponents(nickReason);
                nickModal.addComponents(nick1, nick2);
                interaction.showModal(nickModal);

                const filter = (interaction) => {
                    return interaction.customId === 'modal_nick';
                };

                interaction.awaitModalSubmit({ time: 300000, filter })
                    .then(async (interaction) => {
                        const newNick = interaction.fields.getTextInputValue('nickInput');
                        const reason = interaction.fields.getTextInputValue('reasonInput');

                        const nickEmbed = new EmbedBuilder()
                            .setColor(0xA0B06C)
                            .setTitle(`Nickname Change Request`)
                            .setDescription(`Nickname: ${newNick}\nReason: ${reason}`)
                            .setFooter({ text: `Sent from ${interaction.user.username}` });

                        cchannel.send({ embeds: [nickEmbed] });
                        interaction.reply(`Your request has been submitted.\nPlease allow some time for the Moderators to update it.`);
                    })
                    .catch(err => console.log(`Nickname Modal Error from ${interaction.user.tag}: ${err.message}`));
            }
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