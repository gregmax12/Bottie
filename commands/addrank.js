const { Permissions, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'addrank',
    description: 'Adds a rank to a user',
    execute(message, args) {
        // Role ID that is allowed to use this command
        const allowedRoleID = '1258806351849721996';

        // Check permissions
        if (!message.member.roles.cache.has(allowedRoleID)) {
            const noPermissionEmbed = new EmbedBuilder()
                .setTitle('Error Code 1056')
                .setDescription('- **Error** : You do not have permission to use this command!\n- **Solution** : You must have Ranking Perms in order to use this command!')
                .setColor('#58b9ff')
                .setTimestamp();

            return message.reply({ embeds: [noPermissionEmbed] });
        }

        // Check if the command was used correctly
        if (args.length < 2) {
            const usageEmbed = new EmbedBuilder()
                .setTitle('Error Code 1059')
                .setColor('#58b9ff')
                .setDescription('- **Error** : Command input is invalid!\n- **Solution** : Please use the command in the following format : !addrank <@user> <level>')
                .setTimestamp();

            return message.reply({ embeds: [usageEmbed] });
        }

        // Get the mentioned user
        const user = message.mentions.users.first();
        if (!user) {
            const noUserMentionEmbed = new EmbedBuilder()
                .setTitle('Error Code 1062')
                .setDescription('- **Error** : No valid user mentioned!\n- **Solution** : Please mention a valid user to assign the rank.')
                .setColor('#58b9ff')
                .setTimestamp();

            return message.reply({ embeds: [noUserMentionEmbed] });
        }

        // Get the level
        const level = args[1].toLowerCase();

        // Define role IDs for each level
        const roleIDs = {
            level1: '1258770431331012659',
            level2: '1258770333486288979',
            level3: '1258770232835833856',
            level4: '1258770336862830716'
        };

        const roleID = roleIDs[level];

        if (!roleID) {
            const invalidRankEmbed = new EmbedBuilder()
                .setTitle('Error Code 1060')
                .setDescription('- **Error** : Invalid Rank executed!\n- **Solution** : Please execute the correct rank in order to give ranks to users!')
                .setColor('#58b9ff')
                .setTimestamp();

            return message.reply({ embeds: [invalidRankEmbed] });
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
                .setTitle('Error Code 1058')
                .setDescription('- **Error** : Member not found in the server!\n- **Solution** : Please input and execute the correct username!')
                .setColor('#58b9ff')
                .setTimestamp();

            return message.reply({ embeds: [memberNotFoundEmbed] });
        }

        // Get the role object based on role ID
        const role = guild.roles.cache.get(roleID);
        if (!role) {
            const roleNotFoundEmbed = new EmbedBuilder()
                .setTitle('Error Code 1058')
                .setDescription('- **Error** : Rank not found in the server!\n- **Solution** : Please input and execute the correct rank!')
                .setColor('#58b9ff')
                .setTimestamp();
            return message.reply({ embeds: [roleNotFoundEmbed] });
        }

        // Remove existing level roles
        const levelRoleIDs = Object.values(roleIDs);
        const rolesToRemove = member.roles.cache.filter(r => levelRoleIDs.includes(r.id));

        member.roles.remove(rolesToRemove)
            .then(() => {
                // Add the new role
                return member.roles.add(role);
            })
            .then(() => {
                const successEmbed = new EmbedBuilder()
                    .setTitle('Rank Assigned')
                    .setDescription(`- Success : Successfully added ${role.name} role to ${user.tag}!\n- Bug : Code 1058`)
                    .setColor('#58b9ff')
                    .setTimestamp();

                message.reply({ embeds: [successEmbed] });
            })
            .catch(error => {
                console.error('Failed to add role:', error);
                const errorEmbed = new EmbedBuilder()
                    .setTitle('Error Code 1063')
                    .setDescription('- **Error** : The bot encountered an error while attempting to add the roles you specified.\n- **Solution** : Please contact the staff members as well as the developers.')
                    .setColor('#58b9ff')
                    .setTimestamp();

                message.reply({ embeds: [errorEmbed] });
            });
    },
};
