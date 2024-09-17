const { Permissions, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'addlevel',
    description: 'Adds a rank to a user',
    async execute(message, args) {
        const allowedRoleID = '1258806351849721996';

        // Ensure the user provided both arguments: a user mention and a rank level
        if (args.length < 2) {
            const usageEmbed = new EmbedBuilder()
                .setTitle('Invalid Format `❌`')
                .setDescription('- Format :  `!addrank <user> <level>`')
                .setColor('#0066ff')
                .setTimestamp();

            return message.reply({ embeds: [usageEmbed] });
        }

        // Parse the user from the mention
        const user = message.mentions.users.first();
        const level = args[1];

        // If the user is not mentioned correctly
        if (!user) {
            const invalidUserEmbed = new EmbedBuilder()
                .setTitle('Invalid User `❌`')
                .setDescription('- Please mention a valid user.')
                .setColor('#0066ff')
                .setTimestamp();

            return message.reply({ embeds: [invalidUserEmbed] });
        }

        // Check permissions
        if (!message.member.roles.cache.has(allowedRoleID)) {
            const noPermissionEmbed = new EmbedBuilder()
                .setTitle('Permission Failed `❌`')
                .setDescription('- You do not have permission to use this command.')
                .setColor('#0066ff')
                .setTimestamp();

            return message.reply({ embeds: [noPermissionEmbed], ephemeral: true });
        }

        // Define role IDs for each level
        const roleIDs = {
            1: '1258770431331012659',
            2: '1258770333486288979',
            3: '1258770232835833856',
            4: '1258770336862830716'
        };

        const roleID = roleIDs[level];

        if (!roleID) {
            const invalidRankEmbed = new EmbedBuilder()
                .setTitle('Invalid level `❌`')
                .setDescription('- Please provide a valid level.')
                .setColor('#0066ff')
                .setTimestamp();

            return message.reply({ embeds: [invalidRankEmbed], ephemeral: true });
        }

        const guild = message.guild;

        if (!guild) {
            const noServerEmbed = new EmbedBuilder()
                .setColor('#0066ff')
                .setDescription('This command must be used in a server!');

            return message.reply({ embeds: [noServerEmbed], ephemeral: true });
        }

        // Get the member object
        const member = guild.members.cache.get(user.id);
        if (!member) {
            const memberNotFoundEmbed = new EmbedBuilder()
                .setTitle('Invalid Member `❌`')
                .setDescription('- Member not found in the server!')
                .setColor('#0066ff')
                .setTimestamp();

            return message.reply({ embeds: [memberNotFoundEmbed], ephemeral: true });
        }

        // Get the role object based on role ID
        const role = guild.roles.cache.get(roleID);
        if (!role) {
            const roleNotFoundEmbed = new EmbedBuilder()
                .setTitle('Invalid Level `❌`')
                .setDescription('- User Level not found')
                .setColor('#0066ff')
                .setTimestamp();
            return message.reply({ embeds: [roleNotFoundEmbed], ephemeral: true });
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
                    .setTitle('Level Assigned `✔️`')
                    .setDescription(`- Successfully added ${role.name} role to ${user.tag}!`)
                    .setColor('#0066ff')
                    .setTimestamp();

                message.reply({ embeds: [successEmbed] });
                })
                .catch(error => {
                console.error('Failed to add role:', error);
                const errorEmbed = new EmbedBuilder()
                    .setTitle('Bot Error `❌`')
                    .setDescription('- The bot encountered an error while attempting to add the roles you specified. Please contact the staff members as well as the developers.')
                    .setColor('#0066ff')
                    .setTimestamp();

                message.reply({ embeds: [errorEmbed], ephemeral: true });
                });
                },
                };
