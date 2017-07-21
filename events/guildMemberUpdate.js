exports.run = async (client, guildMember) => {
    const updatedMember = await guildMember.guild.members.find("id", guildMember.id);

    const hasFilteredWord = await client.funcs.wordBlacklist.check(client, updatedMember.displayName);

    if (!hasFilteredWord) {
        return;
    }

    return client.funcs.autoSelener(client, guildMember);
};