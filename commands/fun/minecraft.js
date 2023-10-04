const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const { ButtonStyle, TextInputStyle, ComponentType } = require('discord.js');
const { xen_McKazuha, xen_Kazuha } = require('../../important/image.json');
const { nana_Rat, mason_pingu } = require('../../important/image.json');
const { aLoading, aCheck } = require('../../important/emoji.json');
const xen = process.env['xentriom']

module.exports = {
    data: new SlashCommandBuilder()
        .setName('minecraft')
        .setDescription('Displays information regarding the Minecraft server'),
    async execute(interaction) {
        try {
            const minecraftEmbed = new EmbedBuilder()
                .setColor(0xA0B06C)
                .setDescription('# <:Minecraft2:1133455521882574959>         Minecraft         <:Minecraft1:1133455522943737856> #\n—————————————————————\n> IP: `xentriom.aternos.me`\n> Port: `46402`\n> Seed: `-4354464007068357347`\n—————————————————————\n  • Ping <@399617261230358530> if server is offline •');

            const xen = new ButtonBuilder()
                .setCustomId('mc_xen')
                .setLabel('Xentriom')
                .setStyle(ButtonStyle.Primary);
            const nana = new ButtonBuilder()
                .setCustomId('mc_nana')
                .setLabel('Purpandagirl11')
                .setStyle(ButtonStyle.Primary);
            const nanson = new ButtonBuilder()
                .setCustomId('mc_nanson')
                .setLabel('OpeningHornet68')
                .setStyle(ButtonStyle.Primary);
            const mason = new ButtonBuilder()
                .setCustomId('mc_mason')
                .setLabel('Tooty0Fruity')
                .setStyle(ButtonStyle.Secondary);
            const ziyang = new ButtonBuilder()
                .setCustomId('mc_ziyang')
                .setLabel('ziyangzou')
                .setStyle(ButtonStyle.Primary);
            const willa = new ButtonBuilder()
                .setCustomId('mc_willa')
                .setLabel('SerafWang')
                .setStyle(ButtonStyle.Primary);
            const sam = new ButtonBuilder()
                .setCustomId('mc_sam')
                .setLabel('Sammwise730')
                .setStyle(ButtonStyle.Primary);
            const mac = new ButtonBuilder()
                .setCustomId('mc_mac')
                .setLabel('iGame_on_iMac')
                .setStyle(ButtonStyle.Secondary);

            const button1 = new ActionRowBuilder().addComponents(xen, nana, nanson, mason);
            const button2 = new ActionRowBuilder().addComponents(ziyang, willa, sam, mac);

            const response = await interaction.reply({
                content: '',
                embeds: [minecraftEmbed],
                components: [button1, button2],
                ephemeral: true,
                fetchReply: true
            });

            const collectorFilter = i => i.user.id === interaction.user.id;

            try {
                const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60000 });

                if (confirmation.customId === 'mc_xen') {
                    const mcXenEmbed = new EmbedBuilder()
                        .setColor(0xEC401F)
                        .setDescription('# Frost Town #\nThe entirity of sunflower plains biome is now mines unless you are sufficiently far away. it is up to my judgement on whether said location you plan to build at is *sufficiently* far. please ask first!\n\nBuilding on my land means I have full ownership of said build.')
                        .setThumbnail(`${xen_McKazuha}`)
                        .addFields(
                            { name: 'Permissions', value: 'Everyone is allowed on my property unless specified later. This is subject to change as the changes will reflect on this page.' },
                            { name: 'Allowed', value: '- Walk around\n- Use portal', inline: true },
                            { name: 'Not Allowed', value: '- Take items\n- Aruguing', inline: true }
                        )
                        .setImage(`${xen_Kazuha}`)
                        .setFooter({ text: 'Effective since Aug 13, 2023' });

                    await confirmation.update({
                        content: '',
                        embeds: [mcXenEmbed],
                        components: []
                    });
                }

                if (confirmation.customId === 'mc_nana') {
                    const mcNanaEmbed = new EmbedBuilder()
                        .setColor(0xCBC3E3)
                        .setDescription(`I own the entire cherry blossom biome that my house resides in. Xentrix and Sam are permitted to build their house(s)/base on the land, since they already reside there.\n\nAnyone is allowed to destroy cherry blossom trees, as long as they replace it with a cherry blossom sapling to ensure that the environment doesn't change much.\n\nMy house and builds (one of which is a horse stable that is located right underneath my house) are restricted from everyone (meaning you can not touch or enter my house or anything attached to it), unless they are Xentrix, Ziyang or Nanson. Besides those people, everyone has to ask for permission.\n\nIf you are caught in my base or touching things that aren't yours, I will give you a warning hit or hits, until you leave.`)
                        .setImage(`${nana_Rat}`);
                    await confirmation.update({
                        content: '',
                        embeds: [mcNanaEmbed],
                        components: []
                    });
                }

                if (confirmation.customId === 'mc_nanson') {
                    await confirmation.update({
                        content: `**Warning, my old base is currently under ownership of Ziyang, please refer to his base rules to find the base rules of my old base. The remaining portion of this paragraph describes the old base.** My old base is the bamboo base next to the river under Xen's and Purp's base. My base is just about everything bamboo related in the general area including a patch of farmland close to the 5 squares bamboo.\n\nMy new base has a sign that says that Tooty cannot be within 100 blocks away from said sign (has sugar-cane farm, lots of sweet berries on it's side, a chicken pen, a lava-maker, a cow pen next to the entrance of the base, huge wheat fields, bamboo field), please do not trespass unless if you have permission from me or if I believe your reason is valid.`,
                        embeds: [],
                        components: []
                    });
                }

                if (confirmation.customId === 'mc_mason') {
                    await confirmation.update({
                        content: 'my village is at 1200 1600 and any unauthorized personal will be killed and items will NOT be returned. certain people including but not limited to ziyang ziyang and ziyang will loose their items and not be returned. everyone else is fine to enter but plz ask for permission before using any of my villiagers.\n\ni have a second base at 1561 65 454, anyone caught will be killed and i decide if u loose ur items. passing through is fine but if u enter my home without permission i will kill u without warning.\n\nMy official house is next to xens small home on the mountain, the outside follows the same rules as xens base but once u enter the walls I have permission to kill u if u are not allowed inside.\n\nWhile I am banned all bases and belongings of mine are xens to use or build on',
                        embeds: [],
                        components: []
                    });
                }

                if (confirmation.customId === 'mc_ziyang') {
                    await confirmation.update({
                        content: 'Anyone who steps on my land or builds immediately agrees to the following conditions and rules, unless specified by me.\nMy land is not limited to but contains Nanson\'s old base, Scan’s old base, Svy’s base, the Nether highway, my flower forest and any farms owned by me.\n\nThe rules could change, but currently they are:\n- Do not take items unless specified. \n- People are allowed to enter a unless specified by me then they would be trespassing \n- Do not break blocks on my land unless specified. \n\nIf rules are broken, they lose all rights to their stuff and base and i will kill them and, they have no right to defend themselves.\n\nTooty is banned from all of my own lands',
                        embeds: [],
                        components: []
                    });
                }

                if (confirmation.customId === 'mc_willa') {
                    await confirmation.update({
                        content: 'Two Rules: No stealing. There is specifically one chest labelled “Extras” that is free for everyone to take. Other than that chest, please ask for stuff beforehand',
                        embeds: [],
                        components: []
                    });
                }

                if (confirmation.customId === 'mc_sam') {
                    await confirmation.update({
                        content: 'Unless specified, everyone is allowed in. No touching my stuff. Tooty will be killed on sight.',
                        embeds: [],
                        components: []
                    });
                }

                if (confirmation.customId === 'mc_mac') {
                    await confirmation.update({
                        content: 'i own the underwater base under my netherite shop, anyone trespassing will be killed and items will be lost. the only exception is tooty which is allowed to be inside my base.',
                        embeds: [],
                        components: []
                    });
                }
            }
            catch (e) {
                console.log(`Minecraft collector: ` + e.message);
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