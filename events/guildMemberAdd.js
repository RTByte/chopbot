exports.run = async (client, guildMember) => {
    const userExists = await client.funcs.userCache.userExists(guildMember.user);

    if (!userExists) {
        client.funcs.userCache.newUser(guildMember).then((err) => {
            return userJoined(client, guildMember, true);
        });
    }

    const serverExists = await client.funcs.userCache.serverExists(guildMember);

    if (!serverExists) {
        return userJoined(client, guildMember, true);
    }

    return userJoined(client, guildMember, false);

};

userJoined = async (client, guildMember, firstTime = true) => {
    if (firstTime) {
        client.funcs.userCache.newServer(guildMember);

        if (guildMember.guild.settings.welcomeUsers) {
            await welcomeUser(guildMember);
        }
    }

    try {
        const newUser = new client.methods.Embed()
            .setAuthor(`${guildMember.user.tag} (${guildMember.user.id})`, guildMember.user.avatarURL)
            .setColor("#00ff00")
            .setTimestamp()
            .setFooter(`User joined`);
        
        if(!firstTime){
            newUser.setFooter(`User re-joined`);
        }

        const logChannel = await client.channels.get(guildMember.guild.settings.logChannel);

        return logChannel.send('', { disableEveryone: true, embed: newUser });
    } catch (err) {
        return client.emit("log", err, "error");
    }
}

welcomeUser = async (guildMember) => {
    //TODO: Welcome users on first join
};
