const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Displays help information',
    async execute(message) {
        const helpEmbed = new EmbedBuilder()
            .setTitle('**🌐 Official Parason List**')
            .setDescription('**Official Links and Resources:**\n\n' +
                '💬 **Discord Servers:**\n' +
                '> - **[Northern Frontier](https://discord.gg/northernfrontier)**\n' +
                '> - **[Parason United Discord](https://discord.gg/rK94YZqwk5)** | **[Parason United Group](https://www.roblox.com/groups/12608478/Parason-United#!/about)**\n\n' +
                '🔲 **Roblox Groups:**\n' +
                '> - **[Parason United Group](https://www.roblox.com/groups/12608478/Parason-United#!/about)**\n' +
                '> - **[Lion Committee Group](https://www.roblox.com/groups/33877731/Lion-Committee#!/about)**\n' +
                '> - **[Northern Frontier Group](https://www.roblox.com/groups/34464523/NORTHERN-FRONTIER-HUB#!/about)**\n\n' +
                '📚 **Documents and Guides:**\n' +
                '> - **[Recruitment Document](https://docs.google.com/document/d/1a85ZQ9lD1OF8k824dj9EJAxdbDSkUOiSPGjSa6U42pg/edit?usp=sharing)**\n' +
                '> - **[Chain of Command Document](https://docs.google.com/document/d/1SyTR74HWV7-3L_R_bwGy_tioeUKAmqukrbYGGHXd4QI/edit)**\n' +
                '> - **[Parason Officer Corps Guide](https://docs.google.com/document/d/1nnvaZBnDsd3pvwfCKgPU8UqzRinjMcc5VsJ7qAYebOk/edit)**\n' +
                '> - **[Parason Event Posting Guide](https://docs.google.com/document/d/1e5ac3ZZgKI8f7XibTu3vo4doc8TNnCIpgHs-_bHeHe8/edit)**\n\n' +
                '**🎮 Games:**\n' +
                '> - **[Northern Frontier](https://www.roblox.com/games/17886218648/Northern-Frontier)**\n\n' +
                '💾 **Databases:**\n' +
                '> - **[Parason United Database](https://docs.google.com/spreadsheets/d/1dz1SgbsIL6qoEIH5FAfa0LEd3C6DzK9yRSt9PXS-oQg/edit?usp=sharing)**')
            .setColor('#0066ff')
            .setImage('https://media.discordapp.net/attachments/1258742384842510406/1286242926405353524/Add_a_heading.gif?ex=66ed3292&is=66ebe112&hm=c9fe98ae338fb39448280849cc3336cb6994e644aeac19cd8f1409b4e47ed4ef&=&width=768&height=154')
            .setTimestamp();

        await message.reply({ embeds: [helpEmbed] });
    },
};
