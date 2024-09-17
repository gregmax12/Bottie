const { Permissions, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'removelevel',
    description: 'Removes a rank from a user',
    execute(message, args) {
        // Role ID that is allowed to use this command
        const allowedRoleID = '1258806351849721996';

        // Check permissions
        if (!message.member.roles.cache.has(allowedRoleID)) {
            const noPermissionEmbed = new EmbedBuilder()
                .setTitle('Permission Failed `❌`')
                .setDescription('- You do not have permission to use this command.')
                .setColor('#0066ff')
                .setTimestamp();

            return message.reply({ embeds: [noPermissionEmbed] });
        }

        // Check if the command was used correctly
        if (args.length < 1) {
            const usageEmbed = new EmbedBuilder()
                .setTitle('Invalid Format `❌`')
                .setDescription('- Format :  `!removerank <user> <level>`')
                .setColor('#0066ff')
                .setTimestamp();

            return message.reply({ embeds: [usageEmbed] });
        }

        // Get the mentioned user
        const user = message.mentions.users.first();
        if (!user) {
            const noUserMentionEmbed = new EmbedBuilder()
                .setTitle('Invalid User `❌`')
                .setDescription('- Please mention a valid user.')
                .setColor('#0066ff')
                .setTimestamp();

            return message.reply({ embeds: [noUserMentionEmbed] });
        }

        const guild = message.guild;

        if (!guild) {
            const noServerEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setDescription('This command must be used in a server!');

            return message.reply({ embeds: [noServerEmbed] });
        }

        // Get the member object
        const member = guild.members.cache.get(user.id);
        if (!member) {
            const memberNotFoundEmbed = new EmbedBuilder()
                .setTitle('Invalid Member `❌`')
                .setDescription('- Member not found in the server!')
                .setColor('#0066ff')
                .setTimestamp();


            return message.reply({ embeds: [memberNotFoundEmbed] });
        }

        // Define role IDs for each level
        const roleIDs = {
            1: '1258770431331012659',
            2: '1258770333486288979',
            3: '1258770232835833856',
            4: '1258770336862830716'
        };

        // Filter the roles the member has to check for any level roles
        const levelRoleIDs = Object.values(roleIDs);
        const rolesToRemove = member.roles.cache.filter(r => levelRoleIDs.includes(r.id));

        if (rolesToRemove.size === 0) {
            const noLevelRolesEmbed = new EmbedBuilder()
                .setTitle('Invalid Level `❌`')
                .setDescription('- User Level not found')
                .setColor('#0066ff')
                .setTimestamp();

            return message.reply({ embeds: [noLevelRolesEmbed] });
        }

        // Remove the level roles from the member
        member.roles.remove(rolesToRemove)
            .then(() => {
                const successEmbed = new EmbedBuilder()
                    .setTitle('Level Assigned `✔️`')
                    .setDescription(`- Successfully removed ${role.name} role to ${user.tag}!`)
                    .setColor('#0066ff')
                    .setTimestamp();

                message.reply({ embeds: [successEmbed] });
            })
            .catch(error => {
                console.error('Failed to remove role:', error);
                const errorEmbed = new EmbedBuilder()
                    .setTitle('Bot Error `❌`')
                    .setDescription('- The bot encountered an error while attempting to add the roles you specified. Please contact the staff members as well as the developers.')
                    .setColor('#0066ff')
                    .setTimestamp();
                message.reply({ embeds: [errorEmbed] });
            });
    },
};
