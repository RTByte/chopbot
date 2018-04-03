exports.run = async (client, guildMember) => {
    const updatedMember = await guildMember.guild.members.find("id", guildMember.id);

    const inappropriateName = await client.funcs.wordBlacklist.check(client, updatedMember.displayName);

    if (inappropriateName) return client.funcs.autoSelener(client, guildMember);
    
    return;    
};