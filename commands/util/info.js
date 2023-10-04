const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const xen = process.env['xentriom']
const nana = process.env['purpandagirl11']
const nanson = process.env['nanson10stillplays']
const mason = process.env['e_bob']
const ziyang = process.env['ziyangzou']
const willa = process.env['willa_0616']
const ador = process.env['adorluigi']
const sam = process.env['samofthewise']
const sky = process.env['sunrise7188']
const kylie = process.env['pimpgf']

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Provides basic information')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Info about a user')
                .addUserOption(option => option
                    .setName('target')
                    .setDescription('The user')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Info about the server')),
    async execute(interaction) {
        try {
            const subChoice = interaction.options.getSubcommand();

            if (subChoice === 'user') {
                try {
                    const target = interaction.options.getUser('target') || interaction.user;
                    var gi = "";
                    var hsr = "";
                    var mc_user = "";

                    switch (interaction.user.id) {
                        case xen:
                            gi = `§xᴇɴᴛʀɪx\nUID: 618382139\nAR: 60`;
                            hsr = "xentrix\nUID: 600177940\nTL: 55";
                            mc_user = "xentriom";
                            break;
                        case nana:
                            gi = "N/A";
                            hsr = "N/A";
                            mc_user = "N/A";
                            break;
                        case nanson:
                            gi = "N/A";
                            hsr = "N/A";
                            mc_user = "N/A";
                            break;
                        case mason:
                            gi = "N/A";
                            hsr = "N/A";
                            mc_user = "N/A";
                            break;
                        case ziyang:
                            gi = "N/A";
                            hsr = "N/A";
                            mc_user = "N/A";
                            break;
                        case willa:
                            gi = "N/A";
                            hsr = "N/A";
                            mc_user = "N/A";
                            break;
                        case ador:
                            gi = "N/A";
                            hsr = "N/A";
                            mc_user = "N/A";
                            break;
                        case sam:
                            gi = "N/A";
                            hsr = "N/A";
                            mc_user = "N/A";
                            break;
                        case sky:
                            gi = "N/A";
                            hsr = "N/A";
                            mc_user = "N/A";
                            break;
                        case kylie:
                            gi = "N/A";
                            hsr = "N/A";
                            mc_user = "N/A";
                        default:
                            gi = "N/A";
                            hsr = "N/A";
                            mc_user = "N/A";
                    }

                    const userEmbed = new EmbedBuilder()
                        .setColor(0xA0B06C)
                        .setAuthor({ name: `${target.tag}`, iconURL: target.displayAvatarURL() })
                        .setThumbnail(target.displayAvatarURL())
                        .addFields(
                            { name: `Member`, value: `${target}`, inline: false },
                            { name: `Joined Server`, value: `<t:${parseInt(interaction.member.joinedAt / 1000)}:R>`, inline: true },
                            { name: `Joined Discord`, value: `<t:${parseInt(target.createdAt / 1000)}:R>`, inline: true },
                            { name: `\u200b`, value: `\u200b`, inline: true },
                            { name: `Genshin Impact`, value: `${gi}`, inline: true },
                            { name: `Honkai: Star Rail`, value: `${hsr}`, inline: true },
                            { name: `MC Username`, value: `${mc_user}`, inline: true },
                        )
                        .setTimestamp()
                        .setFooter({ text: `User ID: ${target.id}` });
                    await interaction.reply({ embeds: [userEmbed] });
                }
                catch (e) {
                    await interaction.reply({
                        content: `An error occured executing this command, <@${xen}> has been notified.`,
                        ephemeral: true
                    });
                    console.log(`Error during info user command: ${e}`);
                }
            }

            if (subChoice === 'server') {
                try {
                    const { guild } = interaction;
                    const { name, ownerId, createdTimestamp, memberCount } = guild;
                    const icon = guild.iconURL();
                    const roles = guild.roles.cache.size;
                    const emojis = guild.emojis.cache.size;
                    const guildId = guild.id;
                    const serverEmbed = new EmbedBuilder()
                        .setColor(0xA0B06C)
                        .setAuthor({ name: name, iconURL: icon })
                        .setThumbnail(icon)
                        .addFields(
                            { name: `Name`, value: `${name}`, inline: false },
                            { name: `Date Created`, value: `<t:${parseInt(createdTimestamp / 1000)}:R>`, inline: true },
                            { name: `Server Owner`, value: `<@${ownerId}>`, inline: true },
                            { name: `Member Count`, value: `${memberCount}`, inline: true },
                            { name: `Role Count`, value: `${roles}`, inline: true },
                            { name: `Emoji Count`, value: `${emojis}`, inline: true },
                            { name: `Booster Count`, value: `${guild.premiumSubscriptionCount}`, inline: true },
                        )
                        .setTimestamp()
                        .setFooter({ text: `Server ID: ${guildId}` });

                    await interaction.reply({ embeds: [serverEmbed] });
                }
                catch (e) {
                    await interaction.reply({
                        content: `An error occured executing this command, <@${xen}> has been notified.`,
                        ephemeral: true
                    });
                    console.log(`Error during info server command: ${e}`);
                }
            }
        }
        catch (error) {
            await interaction.reply({
                content: `An error occured executing this command, <@${xen}> has been notified.`,
                ephemeral: true
            });
            console.log(`Error during info command: ${error.message}`);
        }
    },
};