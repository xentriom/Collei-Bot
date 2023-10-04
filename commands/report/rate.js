const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const { ButtonStyle, TextInputStyle, ComponentType } = require('discord.js');
const cMod = process.env['Cult_Moderator']
const nana = process.env['purpandagirl11']
const xen = process.env['xentriom']
const sky = process.env['sunrise7188']
const nanson = process.env['nanson10stillplays']

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rate')
        .setDescription(`Rate a Moderator/Admin for something they've done`),
    async execute(interaction) {
        try {
            const channel = interaction.client.channels.cache.get(cMod);
            const randNum = Math.floor(Math.random() * 3) + 1;
            var greeting = "";
            var username = "";
            switch (randNum) {
                case 1:
                    greeting = 'Great';
                    break;
                case 2:
                    greeting = 'Wonderful';
                    break;
                case 3:
                    greeting = 'Fantastic';
                    break;
            }

            const user1 = new ButtonBuilder()
                .setCustomId('u_nana')
                .setLabel('purpandagirl11')
                .setStyle(ButtonStyle.Primary);
            const user2 = new ButtonBuilder()
                .setCustomId('u_xen')
                .setLabel('xentriom')
                .setStyle(ButtonStyle.Primary);
            const user3 = new ButtonBuilder()
                .setCustomId('u_sky')
                .setLabel('sunrise7188')
                .setStyle(ButtonStyle.Primary);
            const user4 = new ButtonBuilder()
                .setCustomId('u_nanson')
                .setLabel('nanson10stillplays')
                .setStyle(ButtonStyle.Primary);

            const s1 = new ButtonBuilder()
                .setCustomId('s_1')
                .setLabel('1⭐')
                .setStyle(ButtonStyle.Primary);
            const s2 = new ButtonBuilder()
                .setCustomId('s_2')
                .setLabel('2⭐')
                .setStyle(ButtonStyle.Primary);
            const s3 = new ButtonBuilder()
                .setCustomId('s_3')
                .setLabel('3⭐')
                .setStyle(ButtonStyle.Primary);
            const s4 = new ButtonBuilder()
                .setCustomId('s_4')
                .setLabel('4⭐')
                .setStyle(ButtonStyle.Primary);
            const s5 = new ButtonBuilder()
                .setCustomId('s_5')
                .setLabel('5⭐')
                .setStyle(ButtonStyle.Primary);

            const user = new ActionRowBuilder().addComponents(user1, user2, user3, user4);
            const rating = new ActionRowBuilder().addComponents(s1, s2, s3, s4, s5);

            const message = await interaction.reply({
                content: 'Which of the Admin/Moderator would you like to rate?',
                embeds: [],
                components: [user],
                ephemeral: false,
                fetchReply: true
            });


            const collectorFilter = i => i.user.id === interaction.user.id;

            try {
                const confirmation = await message.awaitMessageComponent({ filter: collectorFilter, time: 60000 });

                if (confirmation.customId === 'u_nana') {
                    username = "purpandagirl11";
                    await confirmation.update({
                        content: `${greeting}! How many stars do you want to rate ${username}`,
                        embeds: [],
                        components: [rating]
                    });

                    const nanaFilter = i => i.user.id === interaction.user.id;

                    try {
                        const nanaConfirm = await message.awaitMessageComponent({ filter: nanaFilter, time: 60000 });

                        if (nanaConfirm.customId == 's_1') {
                            const nanas1 = new EmbedBuilder()
                                .setColor(0xA0B06C)
                                .setTitle('Ratings Updated!')
                                .setDescription(`Rating for <@${nana}>\n<@${interaction.user.id}> has gaven you 1 out of 5 stars.`)
                                .setTimestamp();

                            channel.send({ embeds: [nanas1] });
                            await confirmation.editReply({
                                content: `Your rating for ${username} has been sent~`,
                                embeds: [],
                                components: []
                            });
                        }

                        if (nanaConfirm.customId == 's_2') {
                            const nanas2 = new EmbedBuilder()
                                .setColor(0xA0B06C)
                                .setTitle('Ratings Updated!')
                                .setDescription(`Rating for <@${nana}>\n<@${interaction.user.id}> has gaven you 2 out of 5 stars.`)
                                .setTimestamp();

                            channel.send({ embeds: [nanas2] });
                            await confirmation.editReply({
                                content: `Your rating for ${username} has been sent~`,
                                embeds: [],
                                components: []
                            });
                        }

                        if (nanaConfirm.customId == 's_3') {
                            const nanas3 = new EmbedBuilder()
                                .setColor(0xA0B06C)
                                .setTitle('Ratings Updated!')
                                .setDescription(`Rating for <@${nana}>\n<@${interaction.user.id}> has gaven you 3 out of 5 stars.`)
                                .setTimestamp();

                            channel.send({ embeds: [nanas3] });
                            await confirmation.editReply({
                                content: `Your rating for ${username} has been sent~`,
                                embeds: [],
                                components: []
                            });
                        }

                        if (nanaConfirm.customId == 's_4') {
                            const nanas4 = new EmbedBuilder()
                                .setColor(0xA0B06C)
                                .setTitle('Ratings Updated!')
                                .setDescription(`Rating for <@${nana}>\n<@${interaction.user.id}> has gaven you 4 out of 5 stars.`)
                                .setTimestamp();

                            channel.send({ embeds: [nanas4] });
                            await confirmation.editReply({
                                content: `Your rating for ${username} has been sent~`,
                                embeds: [],
                                components: []
                            });
                        }

                        if (nanaConfirm.customId == 's_5') {
                            const nanas5 = new EmbedBuilder()
                                .setColor(0xA0B06C)
                                .setTitle('Ratings Updated!')
                                .setDescription(`Rating for <@${nana}>\n<@${interaction.user.id}> has gaven you 5 out of 5 stars.`)
                                .setTimestamp();

                            channel.send({ embeds: [nanas5] });
                            await confirmation.editReply({
                                content: `Your rating for ${username} has been sent~`,
                                embeds: [],
                                components: []
                            });
                        }
                    }
                    catch (e) {
                        console.log(`Nana rating collector: ` + e.message);
                        await interaction.editReply({
                            content: 'Confirmation not received within 1 minute, cancelling',
                            embeds: [],
                            components: []
                        });
                    }
                }

                if (confirmation.customId === 'u_xen') {
                    username = "xentriom";
                    await confirmation.update({
                        content: `${greeting}! How many stars do you want to rate ${username}`,
                        embeds: [],
                        components: [rating]
                    });

                    const xenFilter = i => i.user.id === interaction.user.id;

                    try {
                        const xenConfirm = await message.awaitMessageComponent({ filter: xenFilter, time: 60000 });

                        if (xenConfirm.customId == 's_1') {
                            const xens1 = new EmbedBuilder()
                                .setColor(0xA0B06C)
                                .setTitle('Ratings Updated!')
                                .setDescription(`Rating for <@${xen}>\n<@${interaction.user.id}> has gaven you 1 out of 5 stars.`)
                                .setTimestamp();

                            channel.send({ embeds: [xens1] });
                            await confirmation.editReply({
                                content: `Your rating for ${username} has been sent~`,
                                embeds: [],
                                components: []
                            });
                        }

                        if (xenConfirm.customId == 's_2') {
                            const xens2 = new EmbedBuilder()
                                .setColor(0xA0B06C)
                                .setTitle('Ratings Updated!')
                                .setDescription(`Rating for <@${xen}>\n<@${interaction.user.id}> has gaven you 2 out of 5 stars.`)
                                .setTimestamp();

                            channel.send({ embeds: [xens2] });
                            await confirmation.editReply({
                                content: `Your rating for ${username} has been sent~`,
                                embeds: [],
                                components: []
                            });
                        }

                        if (xenConfirm.customId == 's_3') {
                            const xens3 = new EmbedBuilder()
                                .setColor(0xA0B06C)
                                .setTitle('Ratings Updated!')
                                .setDescription(`Rating for <@${xen}>\n<@${interaction.user.id}> has gaven you 3 out of 5 stars.`)
                                .setTimestamp();

                            channel.send({ embeds: [xens3] });
                            await confirmation.editReply({
                                content: `Your rating for ${username} has been sent~`,
                                embeds: [],
                                components: []
                            });
                        }

                        if (xenConfirm.customId == 's_4') {
                            const xens4 = new EmbedBuilder()
                                .setColor(0xA0B06C)
                                .setTitle('Ratings Updated!')
                                .setDescription(`Rating for <@${xen}>\n<@${interaction.user.id}> has gaven you 4 out of 5 stars.`)
                                .setTimestamp();

                            channel.send({ embeds: [xens4] });
                            await confirmation.editReply({
                                content: `Your rating for ${username} has been sent~`,
                                embeds: [],
                                components: []
                            });
                        }

                        if (xenConfirm.customId == 's_5') {
                            const xens5 = new EmbedBuilder()
                                .setColor(0xA0B06C)
                                .setTitle('Ratings Updated!')
                                .setDescription(`Rating for <@${xen}>\n<@${interaction.user.id}> has gaven you 5 out of 5 stars.`)
                                .setTimestamp();

                            channel.send({ embeds: [xens5] });
                            await confirmation.editReply({
                                content: `Your rating for ${username} has been sent~`,
                                embeds: [],
                                components: []
                            });
                        }
                    }
                    catch (e) {
                        console.log(`Xen rating collector: ` + e.message);
                        await interaction.editReply({
                            content: 'Confirmation not received within 1 minute, cancelling',
                            embeds: [],
                            components: []
                        });
                    }
                }

                if (confirmation.customId === 'u_sky') {
                    username = "sky";
                    await confirmation.update({
                        content: `${greeting}! How many stars do you want to rate ${username}`,
                        embeds: [],
                        components: [rating]
                    });

                    const skyFilter = i => i.user.id === interaction.user.id;

                    try {
                        const skyConfirm = await message.awaitMessageComponent({ filter: skyFilter, time: 60000 });

                        if (skyConfirm.customId == 's_1') {
                            const skys1 = new EmbedBuilder()
                                .setColor(0xA0B06C)
                                .setTitle('Ratings Updated!')
                                .setDescription(`Rating for <@${sky}>\n<@${interaction.user.id}> has gaven you 1 out of 5 stars.`)
                                .setTimestamp();

                            channel.send({ embeds: [skys1] });
                            await confirmation.editReply({
                                content: `Your rating for ${username} has been sent~`,
                                embeds: [],
                                components: []
                            });
                        }

                        if (skyConfirm.customId == 's_2') {
                            const skys2 = new EmbedBuilder()
                                .setColor(0xA0B06C)
                                .setTitle('Ratings Updated!')
                                .setDescription(`Rating for <@${sky}>\n<@${interaction.user.id}> has gaven you 2 out of 5 stars.`)
                                .setTimestamp();

                            channel.send({ embeds: [skys2] });
                            await confirmation.editReply({
                                content: `Your rating for ${username} has been sent~`,
                                embeds: [],
                                components: []
                            });
                        }

                        if (skyConfirm.customId == 's_3') {
                            const skys3 = new EmbedBuilder()
                                .setColor(0xA0B06C)
                                .setTitle('Ratings Updated!')
                                .setDescription(`Rating for <@${sky}>\n<@${interaction.user.id}> has gaven you 3 out of 5 stars.`)
                                .setTimestamp();

                            channel.send({ embeds: [skys3] });
                            await confirmation.editReply({
                                content: `Your rating for ${username} has been sent~`,
                                embeds: [],
                                components: []
                            });
                        }

                        if (skyConfirm.customId == 's_4') {
                            const skys4 = new EmbedBuilder()
                                .setColor(0xA0B06C)
                                .setTitle('Ratings Updated!')
                                .setDescription(`Rating for <@${sky}>\n<@${interaction.user.id}> has gaven you 4 out of 5 stars.`)
                                .setTimestamp();

                            channel.send({ embeds: [skys4] });
                            await confirmation.editReply({
                                content: `Your rating for ${username} has been sent~`,
                                embeds: [],
                                components: []
                            });
                        }

                        if (skyConfirm.customId == 's_5') {
                            const skys5 = new EmbedBuilder()
                                .setColor(0xA0B06C)
                                .setTitle('Ratings Updated!')
                                .setDescription(`Rating for <@${sky}>\n<@${interaction.user.id}> has gaven you 5 out of 5 stars.`)
                                .setTimestamp();

                            channel.send({ embeds: [skys5] });
                            await confirmation.editReply({
                                content: `Your rating for ${username} has been sent~`,
                                embeds: [],
                                components: []
                            });
                        }
                    }
                    catch (e) {
                        console.log(`Sky rating collector: ` + e.message);
                        await interaction.editReply({
                            content: 'Confirmation not received within 1 minute, cancelling',
                            embeds: [],
                            components: []
                        });
                    }
                }

                if (confirmation.customId === 'u_nanson') {
                    username = "nanson";
                    await confirmation.update({
                        content: `${greeting}! How many stars do you want to rate ${username}`,
                        embeds: [],
                        components: [rating]
                    });

                    const nsonFilter = i => i.user.id === interaction.user.id;

                    try {
                        const nsonConfirm = await message.awaitMessageComponent({ filter: nsonFilter, time: 60000 });

                        if (nsonConfirm.customId == 's_1') {
                            const nsons1 = new EmbedBuilder()
                                .setColor(0xA0B06C)
                                .setTitle('Ratings Updated!')
                                .setDescription(`Rating for <@${nanson}>\n<@${interaction.user.id}> has gaven you 1 out of 5 stars.`)
                                .setTimestamp();

                            channel.send({ embeds: [nsons1] });
                            await confirmation.editReply({
                                content: `Your rating for ${username} has been sent~`,
                                embeds: [],
                                components: []
                            });
                        }

                        if (nsonConfirm.customId == 's_2') {
                            const nsons2 = new EmbedBuilder()
                                .setColor(0xA0B06C)
                                .setTitle('Ratings Updated!')
                                .setDescription(`Rating for <@${nanson}>\n<@${interaction.user.id}> has gaven you 2 out of 5 stars.`)
                                .setTimestamp();

                            channel.send({ embeds: [nsons2] });
                            await confirmation.editReply({
                                content: `Your rating for ${username} has been sent~`,
                                embeds: [],
                                components: []
                            });
                        }

                        if (nsonConfirm.customId == 's_3') {
                            const nsons3 = new EmbedBuilder()
                                .setColor(0xA0B06C)
                                .setTitle('Ratings Updated!')
                                .setDescription(`Rating for <@${nanson}>\n<@${interaction.user.id}> has gaven you 3 out of 5 stars.`)
                                .setTimestamp();

                            channel.send({ embeds: [nsons3] });
                            await confirmation.editReply({
                                content: `Your rating for ${username} has been sent~`,
                                embeds: [],
                                components: []
                            });
                        }

                        if (nsonConfirm.customId == 's_4') {
                            const nsons4 = new EmbedBuilder()
                                .setColor(0xA0B06C)
                                .setTitle('Ratings Updated!')
                                .setDescription(`Rating for <@${nanson}>\n<@${interaction.user.id}> has gaven you 4 out of 5 stars.`)
                                .setTimestamp();

                            channel.send({ embeds: [nsons4] });
                            await confirmation.editReply({
                                content: `Your rating for ${username} has been sent~`,
                                embeds: [],
                                components: []
                            });
                        }

                        if (nsonConfirm.customId == 's_5') {
                            const nsons5 = new EmbedBuilder()
                                .setColor(0xA0B06C)
                                .setTitle('Ratings Updated!')
                                .setDescription(`Rating for <@${nanson}>\n<@${interaction.user.id}> has gaven you 5 out of 5 stars.`)
                                .setTimestamp();

                            channel.send({ embeds: [nsons5] });
                            await confirmation.editReply({
                                content: `Your rating for ${username} has been sent~`,
                                embeds: [],
                                components: []
                            });
                        }
                    }
                    catch (e) {
                        console.log(`Nanson rating collector: ` + e.message);
                        await interaction.editReply({
                            content: 'Confirmation not received within 1 minute, cancelling',
                            embeds: [],
                            components: []
                        });
                    }
                }
            }
            catch (e) {
                console.log(`Rating user collector: ` + e.message);
                await interaction.editReply({
                    content: 'Confirmation not received within 1 minute, cancelling',
                    embeds: [],
                    components: []
                });
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