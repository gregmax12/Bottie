const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'promote',
    description: 'Assigns a rank to a user',
    async execute(message, args) {
        const roleIDs = {
            'pr': '1248818417499373638', // Private
            'lc': '1248818393146986497', // Lance Corporal
            'co': '1248818392681680908', // Corporal
            'se': '1248818391805067264', // Sergeant
            'cs': '1248818391024799804', // Chef Sergeant
            'wo': '1248815968885538816', // Warrant Officer
            'li': '1248819920595189862', // Lieutenant
            'pa': '1248815967262212176', // Pathfinder
            'ca': '1248815966263967787', // Captain
            'fm': '1248815965924491294', // Field Major
            'co': '1248815965580558418', // Colonel
            'bs': '1248815964620066856', // Brigadier Sovereign
            'fm': '1248815960966823978'  // Field Marshal
        };

        const roleNames = {
            'pr': 'Private',
            'lc': 'Lance Corporal',
            'co': 'Corporal',
            'se': 'Sergeant',
            'cs': 'Chef Sergeant',
            'wo': 'Warrant Officer',
            'li': 'Lieutenant',
            'pa': 'Pathfinder',
            'ca': 'Captain',
            'fm': 'Field Major',
            'co': 'Colonel',
            'bs': 'Brigadier Sovereign',
            'fm': 'Field Marshal'
        };

        const levelRoles = {
            'level1': '1258770431331012659',
            'level2': '1258770333486288979',
            'level3': '1258770232835833856',
            'level4': '1258770336862830716'
        };

        const promotionHierarchy = {
            'level1': ['pr', 'lc', 'co'],
            'level2': ['pr', 'lc', 'co', 'se'],
            'level3': ['pr', 'lc', 'co', 'se', 'cs', 'wo', 'li', 'pa', 'ca', 'fm'],
            'level4': ['pr', 'lc', 'co', 'se', 'cs', 'wo', 'li', 'pa', 'ca', 'fm', 'co', 'bs', 'fm']
        };

        const createEmbed = (color, title, description) => {
            return new EmbedBuilder()
                .setColor(color)
                .setTitle(title)
                .setDescription(description);
        };

        if (!message.member.permissions.has('MANAGE_ROLES')) {
            return message.reply({
                embeds: [createEmbed('#0066ff', 'Permission Failed `❌`', "- You don't have permission to use this command.")]
            });
        }

        const user = message.mentions.members.first();
        const newRank = args[1];
        if (!user || !newRank || !roleIDs[newRank]) {
            return message.reply({
                embeds: [createEmbed('#0066ff', 'Invalid Format `❌`', '- Please mention a user and specify a valid rank.')]
            });
        }

        const userRoles = user.roles.cache.map(role => role.id);
        const currentRoleID = userRoles.find(role => Object.values(roleIDs).includes(role));

        const execLevelRoleID = message.member.roles.cache.find(role => Object.values(levelRoles).includes(role.id))?.id;
        const execLevel = Object.keys(levelRoles).find(key => levelRoles[key] === execLevelRoleID);

        if (!execLevel) {
            return message.reply({
                embeds: [createEmbed('#0066ff', 'Invalid Rank `❌`', '- You do not have a valid level role to promote.')]
            });
        }

        const newRoleID = roleIDs[newRank];
        const newRankLevel = Object.keys(roleIDs).find(key => roleIDs[key] === newRoleID);

        // Ensure promotion is to a higher rank
        const currentRankLevel = Object.keys(roleIDs).find(key => roleIDs[key] === currentRoleID);
        const newRankIndex = promotionHierarchy[execLevel].indexOf(newRank);
        const currentRankIndex = promotionHierarchy[execLevel].indexOf(currentRankLevel);

        if (currentRankIndex >= 0 && newRankIndex <= currentRankIndex) {
            // Send error message without removing any role
            return message.reply({
                embeds: [createEmbed('#0066ff', 'Promotion Failed `❌`', `- You cannot promote ${user} to the ${roleNames[newRank]} role as it is a demotion.`)]
            });
        }

        if (!promotionHierarchy[execLevel].includes(newRank)) {
            return message.reply({
                embeds: [createEmbed('#0066ff', 'Promotion Failed `❌`', `- You cannot promote to the ${roleNames[newRank]} role.`)]
            });
        }

        // Remove current role if promotion is valid
        if (currentRoleID) {
            await user.roles.remove(currentRoleID);
        }

        // Add new role
        await user.roles.add(newRoleID);

        const successEmbed = createEmbed('#0066ff', 'Rank Assigned `✔️`', `- Successfully promoted ${user} to ${roleNames[newRank]}.`);
        message.channel.send({ embeds: [successEmbed] });
    }
};
