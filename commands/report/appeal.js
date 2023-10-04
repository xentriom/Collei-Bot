const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const { ButtonStyle, TextInputStyle, ComponentType } = require('discord.js');
const { aLoading, aCheck } = require('../../important/emoji.json');
const wait = require('node:timers/promises').setTimeout;
const cMod = process.env['Cult_Moderator']
const xen = process.env['xentriom']

module.exports = {
    data: new SlashCommandBuilder()
        .setName('appeal')
        .setDescription('Appeal a ban'),
    async execute(interaction) {
        try {
            if (interaction.user.id === "1012496158792368158") {
                interaction.reply('You have used your **one** chance already.');
            }
            else {
                const appealModal = new ModalBuilder()
                    .setCustomId('appealModal')
                    .setTitle('Ban Appeal Form');
                const agreeId = new TextInputBuilder()
                    .setCustomId('agreeId')
                    .setLabel("You can only appeal ONCE.")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('type \'yes\' if you understand')
                    .setRequired(true);
                const dateInput = new TextInputBuilder()
                    .setCustomId('dateInput')
                    .setLabel("Has it been a month since being banned?")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('yes/no only')
                    .setRequired(true);
                const whyInput = new TextInputBuilder()
                    .setCustomId('whyInput')
                    .setLabel("Why should we unban you?")
                    .setStyle(TextInputStyle.Paragraph)
                    .setMinLength(100)
                    .setRequired(true);
                const refractionInput = new TextInputBuilder()
                    .setCustomId('refractionInput')
                    .setLabel("How have you reflected on your infraction(s)")
                    .setStyle(TextInputStyle.Paragraph)
                    .setMinLength(100)
                    .setRequired(true);
                const closeInput = new TextInputBuilder()
                    .setCustomId('closeInput')
                    .setLabel("Your final statement/thoughts")
                    .setStyle(TextInputStyle.Paragraph)
                    .setRequired(true);
                const Rappeal_agree = new ActionRowBuilder().addComponents(agreeId);
                const Rappeal_date = new ActionRowBuilder().addComponents(dateInput);
                const Rappeal_why = new ActionRowBuilder().addComponents(whyInput);
                const Rappeal_refr = new ActionRowBuilder().addComponents(refractionInput);
                const Rappeal_close = new ActionRowBuilder().addComponents(closeInput);
                appealModal.addComponents(Rappeal_agree, Rappeal_date, Rappeal_why, Rappeal_refr, Rappeal_close);
                interaction.showModal(appealModal);

                const filter = (interaction) => {
                    return interaction.customId === 'appealModal';
                };

                interaction.awaitModalSubmit({ time: 300000, filter })
                    .then(async (interaction) => {
                        const agreement = interaction.fields.getTextInputValue('agreeId').toLowerCase();
                        const graceperiod = interaction.fields.getTextInputValue('dateInput').toLowerCase();
                        const reasoning = interaction.fields.getTextInputValue('whyInput');
                        const reflection = interaction.fields.getTextInputValue('refractionInput');
                        const ending = interaction.fields.getTextInputValue('closeInput');
                        const moderatorChannel = interaction.client.channels.cache.get(cMod);

                        if (agreement === 'yes' && graceperiod === 'yes') {
                            const banEmbed = new EmbedBuilder()
                                .setColor(0xA0B06C)
                                .setTitle(`Ban Appealed`)
                                .setDescription(`User: <@${interaction.user.id}>\nReasoning: \`${reasoning}\`\nReflection: \`${reflection}\`\nClosing: \`${ending}\``);

                            const confirm = new ButtonBuilder()
                                .setCustomId('appeal_confirm')
                                .setLabel('Confirm Appeal')
                                .setStyle(ButtonStyle.Primary);
                            const cancel = new ButtonBuilder()
                                .setCustomId('appeal_cancel')
                                .setLabel('Cancel Appeal')
                                .setStyle(ButtonStyle.Danger);
                            const button = new ActionRowBuilder().addComponents(confirm, cancel);
                            const response = await interaction.reply({
                                content: 'This is your appeal submission, please confirm all the contents are filled out to the best of your abilities. This is will be your single time use of the appeal command.',
                                embeds: [banEmbed],
                                components: [button],
                                ephemeral: true,
                                fetchReply: true
                            });

                            const collectorFilter = i => i.user.id === interaction.user.id;

                            try {
                                const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60000 });
                                if (confirmation.customId === 'appeal_confirm') {
                                    moderatorChannel.send({ embeds: [banEmbed] });
                                    await confirmation.update({
                                        content: `Your appeal has been successfully sent.\nPlease allow up to 2 weeks for the appeal to be proccessed. If the appeal does happen to go through, the following will happen:\n- A full reset will occur\n- You will be unbanned\n- You will be given a final warning.\nIf you do get banned thereafter, you will not be able to fill this form out again and will be forever banned.`,
                                        embeds: [],
                                        components: []
                                    });
                                }

                                if (confirmation.customId === 'appeal_cancel') {
                                    await confirmation.update({
                                        content: `${aLoading} Canceling appeal....`,
                                        embeds: [],
                                        components: []
                                    });
                                    await wait(1000);
                                    await confirmation.editReply({
                                        content: `${aCheck} Appeal successfully canceled`,
                                        embeds: [],
                                        components: []
                                    });
                                }
                            }
                            catch (e) {
                                console.log(`Appeal button collector: ` + e.message);
                                await interaction.editReply({
                                    content: 'Confirmation not received within 1 minute, canceling',
                                    embeds: [],
                                    components: []
                                });
                            }
                        }

                        else if (agreement === 'yes' && graceperiod !== 'yes') {
                            interaction.reply('Your **ban appeal** was unsuccessful due to:\n- Not being banned for longer than __one__ month');
                        }

                        else if (agreement !== 'yes' && graceperiod === 'yes') {
                            interaction.reply('Your **ban appeal** was unsuccessful due to:\n- Not agreeing to use your __one__ chance');
                        }

                        else {
                            interaction.reply('Your **ban appeal** was unsuccessful due to:\n- Not agreeing to one chance\n- Not banned for longer than 1 month');
                        }
                    })
                    .catch(err => console.log(`Appeal Modal Error: ${err.message}`));
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