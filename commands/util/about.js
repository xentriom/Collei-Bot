const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder } = require('discord.js');
const { ButtonBuilder, ButtonStyle } = require('discord.js');
const { eInv, eWeb } = require('../../emoji.json');
const { colleiPFP } = require('../../image.json');
const xen = process.env['xentriom']
const os = require('os');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Shows information on the bot'),
    async execute(interaction) {
        try {
            const user = interaction.client.users.cache.get(xen);
            const nodeVersion = "v18.12.1";
            const djsVersion = "v14.13.0";
            const botVersion = "v2.0.1";
            const aboutEmbed = new EmbedBuilder()
                .setColor(0xA0B06C)
                .setTitle('Collei Bot')
                .setDescription(`Collei is a multifunctional bot that works hand and hand with Sucrose. With access to basic commands as well as some complex ones, Collei is able to reduce the amount of bots in servers by a few.`)
                .setThumbnail(colleiPFP)
                .addFields(
                    { name: "Collei Version", value: botVersion, inline: true },
                    { name: "Node Version", value: nodeVersion, inline: true },
                    { name: "Discord.js Version", value: djsVersion, inline: true },
                    { name: "Uptime", value: FormatSeconds(os.uptime()), inline: true },
                )
                .setTimestamp()
                .setFooter({ text: `Made by @xentriom`, iconURL: user.displayAvatarURL() });

            const docu = new ButtonBuilder()
                .setLabel('Documentation')
                .setURL('https://xentrix.gitbook.io/collei-bot')
                .setEmoji(eWeb)
                .setStyle(ButtonStyle.Link);
            const inv = new ButtonBuilder()
                .setLabel('Server')
                .setURL('https://discord.gg/C23NJVYMDd')
                .setEmoji(eInv)
                .setStyle(ButtonStyle.Link);

            const row = new ActionRowBuilder().addComponents(docu, inv);

            await interaction.reply({ embeds: [aboutEmbed], components: [row] });

            // function FormatSeconds(n) {
            //     var day = parseInt(n / (24 * 3600));
            //     n = n % (24 * 3600);
            //     var hour = parseInt(n / 3600);
            //     n %= 3600;
            //     var minute = parseInt(n / 60);
            //     n %= 60;
            //     var second = parseInt(n);

            //     return `${day}d ${hour}h ${minute}m ${second}s`;
            // }
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

function FormatSeconds(n) {
    var day = parseInt(n / (24 * 3600));
    n = n % (24 * 3600);
    var hour = parseInt(n / 3600);
    n %= 3600;
    var minute = parseInt(n / 60);
    n %= 60;
    var second = parseInt(n);

    return `${day}d ${hour}h ${minute}m ${second}s`;
}