const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const { ButtonStyle, TextInputStyle, ComponentType } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const { report_excla } = require('../../important/image.json');
const { aLoading, aCheck } = require('../../important/emoji.json');
const cMod = process.env['Cult_Moderator']
const pMod = process.env['Personal_Moderator']
const pGen = process.env['Personal_General']
const xen = process.env['xentriom']

module.exports = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('Files a report to the Moderators')
        .addStringOption(option =>
            option.setName('action')
                .setDescription('Select the report type')
                .setRequired(true)
                .addChoices(
                    { name: 'Create', value: 'action_create' },
                    { name: 'Testify', value: 'action_testify' },
                    { name: 'Refute', value: 'action_refute' },
                    { name: 'Counter', value: 'action_counter' },
                )),
    async execute(interaction) {
        try {
            const actionChoice = interaction.options.getString('action');
            const moderatorChannel = interaction.client.channels.cache.get(cMod);

            if (actionChoice === 'action_create') {
                const reportModal = new ModalBuilder()
                    .setCustomId('modal_report')
                    .setTitle('Report Form');
                const userInput = new TextInputBuilder()
                    .setCustomId('userInput')
                    .setLabel("Who are you reporting?")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('xentriom')
                    .setRequired(true);
                const reasonInput = new TextInputBuilder()
                    .setCustomId('reasonInput')
                    .setLabel("Describe what happened")
                    .setStyle(TextInputStyle.Paragraph)
                    .setPlaceholder('I was going about my peaceful day when the great ol xentriom decended upon me.')
                    .setRequired(true);
                const punishInput = new TextInputBuilder()
                    .setCustomId('punishInput')
                    .setLabel("Desired punishment; be resonable")
                    .setStyle(TextInputStyle.Paragraph)
                    .setPlaceholder('To exact vengeance I wish to stain my hands with the blood of my enemy.')
                    .setRequired(false);
                const imageInput = new TextInputBuilder()
                    .setCustomId(`imageInput`)
                    .setLabel("Attach an image/video link")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('https://cdn.discordapp.com/attachments/1055641564904444045/1135340639811293194/IMG_4510.png')
                    .setRequired(false);
                const firstRowRep = new ActionRowBuilder().addComponents(userInput);
                const secondRowRep = new ActionRowBuilder().addComponents(reasonInput);
                const thirdRowRep = new ActionRowBuilder().addComponents(punishInput);
                const fourthRowRep = new ActionRowBuilder().addComponents(imageInput);
                reportModal.addComponents(firstRowRep, secondRowRep, thirdRowRep, fourthRowRep);
                interaction.showModal(reportModal);

                const filter = (interaction) => {
                    return interaction.customId === 'modal_report';
                };

                interaction.awaitModalSubmit({ time: 300000, filter })
                    .then(async (interaction) => {
                        const userReported = interaction.fields.getTextInputValue('userInput');
                        const reportedReason = interaction.fields.getTextInputValue('reasonInput');
                        const punishReason = interaction.fields.getTextInputValue('punishInput');
                        const imageLink = interaction.fields.getTextInputValue('imageInput');

                        const reportEmbed = new EmbedBuilder()
                            .setColor(0xA0B06C)
                            .setTitle(`**==== REPORT ====**`)
                            .setDescription(`\`User:\` ${userReported}\n\`Reason:\` ${reportedReason}\n\`Desired Punishment:\` ${punishReason}\n\`Evidence:\` ${imageLink}`)
                            .setThumbnail(report_excla)
                            .setTimestamp()
                            .setFooter({ text: `Sent from: ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });

                        const confirm = new ButtonBuilder()
                            .setCustomId('report_confirm')
                            .setLabel('Confirm Report')
                            .setStyle(ButtonStyle.Primary);
                        const cancel = new ButtonBuilder()
                            .setCustomId('report_cancel')
                            .setLabel('Cancel Report')
                            .setStyle(ButtonStyle.Danger);
                        const button = new ActionRowBuilder().addComponents(confirm, cancel);
                        const response = await interaction.reply({
                            content: 'This is your report submission, please confirm all the contents filled in are true.',
                            embeds: [reportEmbed],
                            components: [button],
                            ephemeral: true,
                            fetchReply: true
                        });

                        const collectorFilter = i => i.user.id === interaction.user.id;

                        try {
                            const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60000 });
                            if (confirmation.customId === 'report_confirm') {
                                moderatorChannel.send({ embeds: [reportEmbed] });
                                await confirmation.update({
                                    content: 'Success your report has been sent!\nA copy was sent to your DMs for your reference.',
                                    embeds: [],
                                    components: []
                                });
                                await interaction.user.send({
                                    content: `This is your copy of the report you just made <t:${Math.floor(interaction.createdTimestamp / 1000)}:R>.\nWe will attempt to resolve your issue <t:${Math.floor(interaction.createdTimestamp / 1000) + 172800}:R>.`,
                                    embeds: [reportEmbed]
                                });
                            }

                            if (confirmation.customId === 'report_cancel') {
                                await confirmation.update({
                                    content: `${aLoading} Canceling report....`,
                                    embeds: [],
                                    components: []
                                });
                                await wait(1000);
                                await confirmation.editReply({
                                    content: `${aCheck} Report successfully canceled`,
                                    embeds: [],
                                    components: []
                                })
                            }
                        }
                        catch (e) {
                            console.log(`Report create collector: ` + e.message);
                            await interaction.editReply({
                                content: 'Confirmation not received within 1 minute, cancelling',
                                embeds: [],
                                components: []
                            });
                        }
                    })
                    .catch(err => console.log(`Report Modal Error from ${interaction.user.tag}: ${err.message}`));
            }

            if (actionChoice === 'action_testify') {
                const testimonyModal = new ModalBuilder()
                    .setCustomId('modal_testify')
                    .setTitle('Testimony Form');
                const tesUserInput = new TextInputBuilder()
                    .setCustomId('tesUserInput')
                    .setLabel("Who are you testifying for")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('purpandagirl11')
                    .setRequired(true);
                const oathInput = new TextInputBuilder()
                    .setCustomId('oathInput')
                    .setLabel("Do you swear to tell the truth")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('Absolutly')
                    .setRequired(true);
                const testiInput = new TextInputBuilder()
                    .setCustomId('testiInput')
                    .setLabel("What did you witness")
                    .setStyle(TextInputStyle.Paragraph)
                    .setPlaceholder('With my very own eyes I saw his murderous eyes... they gazed upon her and slained Nana.')
                    .setRequired(true);
                const tesUserRow = new ActionRowBuilder().addComponents(tesUserInput);
                const oathRow = new ActionRowBuilder().addComponents(oathInput);
                const testiRow = new ActionRowBuilder().addComponents(testiInput);
                testimonyModal.addComponents(tesUserRow, oathRow, testiRow);
                interaction.showModal(testimonyModal);

                const filter = (interaction) => {
                    return interaction.customId === 'modal_testify';
                };
                interaction.awaitModalSubmit({ time: 300000, filter })
                    .then(async (interaction) => {
                        const forUser = interaction.fields.getTextInputValue('tesUserInput');
                        const swearOath = interaction.fields.getTextInputValue('oathInput');
                        const theTesti = interaction.fields.getTextInputValue('testiInput');
                        var theOathAns = `Do you solemnly swear to tell the truth, the whole truth and nothing but the truth? \`${swearOath}\``;
                        const testiEmbed = new EmbedBuilder()
                            .setColor(0xA0B06C)
                            .setTitle(`**==== TESTIMONY ====**`)
                            .setDescription(`${interaction.user.tag}'s testimony for ${forUser}\n\n${theOathAns}\n\n\`${theTesti}\``)
                            .setTimestamp()
                            //.setFooter({ text: `Sent from: ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
                        const badTestiEmbed = new EmbedBuilder()
                            .setColor(0xA0B06C)
                            .setTitle(`**==== TESTIMONY ====**`)
                            .setDescription(`${interaction.user.tag}'s testimony for ${forUser}\n\n${theOathAns}\n\n\`${theTesti}\`\n\nIf you were to be found lying, consequences will be very harsh.`)
                            .setTimestamp()
                            //.setFooter({ text: `Sent from: ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
                        interaction.reply('testify submitted')
                    })
                    .catch(err => console.log(`Testify Modal Error: ${err.message}`));
            }

            if (actionChoice === 'action_refute') {
                const refuteModal = new ModalBuilder()
                    .setCustomId('modal_refute')
                    .setTitle('Refute Form');
                const rNumInput = new TextInputBuilder()
                    .setCustomId('rNumInput')
                    .setLabel("Enter your report number")
                    .setStyle(TextInputStyle.Short)
                    .setMaxLength(2)
                    .setMinLength(2)
                    .setPlaceholder('00')
                    .setRequired(true);
                const rReasonInput = new TextInputBuilder()
                    .setCustomId('rReasonInput')
                    .setLabel("Why are you refuting")
                    .setStyle(TextInputStyle.Paragraph)
                    .setPlaceholder('svy3 has done many wrongs and I wish to bring down injustice!')
                    .setRequired(true);
                const rNePropInput = new TextInputBuilder()
                    .setCustomId('rNePropInput')
                    .setLabel("Whats your new proposal")
                    .setStyle(TextInputStyle.Paragraph)
                    .setPlaceholder('I demand such injustice be served with a 420 minute ban.')
                    .setRequired(true);
                const rImageInput = new TextInputBuilder()
                    .setCustomId('rImageInput')
                    .setLabel("Attach an image/video link")
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder('https://streamable.com/j4yod8')
                    .setRequired(false);
                const rNumRow = new ActionRowBuilder().addComponents(rNumInput);
                const rReaRow = new ActionRowBuilder().addComponents(rReasonInput);
                const rProNRow = new ActionRowBuilder().addComponents(rNePropInput);
                const rImgRow = new ActionRowBuilder().addComponents(rImageInput);
                refuteModal.addComponents(rNumRow, rReaRow, rProNRow, rImgRow);
                interaction.showModal(refuteModal);

                const filter = (interaction) => {
                    return interaction.customId === 'modal_refute';
                };
                interaction.awaitModalSubmit({ time: 300000, filter })
                    .then(interaction => interaction.reply('refute submitted'))
                    .catch(err => console.log('No modal submit interaction was collected'));
            }

            if (actionChoice === 'action_counter') {
                await interaction.reply({
                    content: '<a:ld:1058517506471510096> Fetching total reports...',
                    ephemeral: true,
                    fetchReply: true
                });
                await wait(1000);

                switch (interaction.user.id) {
                    case '1012496158792368158': // Tooty
                        await interaction.editReply({ content: "You have been reported **18** times.", ephemeral: true });
                        break;
                    case '456594330744782850': // XMQ
                        await interaction.editReply({ content: "You have been reported **5** times.", ephemeral: true });
                        break;
                    case '800194649279954964': // Nanson
                        await interaction.editReply({ content: "You have been reported **2** times.", ephemeral: true });
                        break;
                    case '703942312618622978': // Ziyang
                        await interaction.editReply({ content: "You have been reported **5** times.", ephemeral: true });
                        break;
                    case '717063912830533653': // Sam
                        await interaction.editReply({ content: "You have been reported **5** times.", ephemeral: true });
                        break;
                    default:
                        await interaction.editReply({ content: "You have been reported **0** times.", ephemeral: true });
                        break;
                }
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