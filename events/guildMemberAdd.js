exports.run = async (client, guildMember) => {
    //Currently stripped user tracking because we haven't been using it
    //for literally anything until I can invest the time to properly write the whole system

    //Auto-Selener (Automatically change names of users with blacklisted words)
    const inappropriateName = await client.funcs.wordBlacklist.check(client, guildMember.displayName);

    if (inappropriateName) await client.funcs.autoSelener(client, guildMember);

    //Exiting if bot is not fully initialized (No log channel to send the embed to)
    if (!guildMember.guild.settings.logChannel) return;

    //New User log
    const newUser = new client.methods.Embed()
        .setAuthor(`${guildMember.user.tag} (${guildMember.user.id})`, guildMember.user.avatarURL())
        .setColor("#60fe60")
        .setTimestamp()
        .setFooter(`User joined`);

    const logChannel = await client.channels.get(guildMember.guild.settings.logChannel);

    await logChannel.send('', { disableEveryone: true, embed: newUser });

    //Exit if we're not welcoming a user
    if (!guildMember.guild.settings.welcomeUsers) return;

    //Exit if there's not welcome message set
    if (!guildMember.guild.settings.welcomeMessage) return;

    return welcomeUser(guildMember);
};

welcomeUser = async (guildMember) => {
    const welcomeMessage = guildMember.guild.settings.welcomeMessage;

    //TODO: regex so that we can have tags for users in the welcome message

    const welcomeEmbed = new client.methods.Embed()
        .setAuthor(guildMember.displayName, guildMember.user.avatarURL())
        .setThumbnail(msg.guild.iconURL(), 50, 50)
        .setColor("#60fe60")
        .setDescription(welcomeMessage)
        .setTimestamp();

    return guildMember.guild.channels.default.send('', { disableEveryone: true, embed: welcomeEmbed });
};
