const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
    client.on('guildMemberAdd', async (member) => {
        const channelId = '1252263349065089034'; 
        const channel = member.guild.channels.cache.get(channelId);

        if (!channel) {
            console.error('Could not find channel');
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle(`**Welcome to Parason United**`)
            .setDescription(`:wave: Welcome to our server <@${member.user.id}>! To join Parason United, please refer to the 'How to Join' channel for detailed instructions. We hope you enjoy your stay here. If you have any questions, feel free to ask.`)
            .setColor(0x58b9ff)
            .setTimestamp(new Date())
            .setFooter({ text: 'Enjoy your stay!' })
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }));

        channel.send({ embeds: [embed] });

        const roleIds = [
            '1251367866738151505', // Original role
            '1287004199787429888', // Additional roles
            '1287004401470541844',
            '1287004891117649974',
            '1287011144279527475',
            '1287009457301229578'

        
        ];

        try {
            // Assign all roles concurrently
            await Promise.all(roleIds.map(async roleId => {
                const role = member.guild.roles.cache.get(roleId);
                if (role && !member.roles.cache.has(roleId)) {
                    await member.roles.add(role);
                    console.log(`Assigned role ${role.name} to ${member.user.tag}`);
                }
            }));
        } catch (error) {
            console.error(`Failed to assign roles to ${member.user.tag}:`, error);
        }
    });
};
