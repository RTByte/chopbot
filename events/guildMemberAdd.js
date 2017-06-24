exports.run = async (client, guildMember) => {
    const guildConf = await client.funcs.confs.get(guildMember.guild);

    const userExists = await client.funcs.userCache.userExists(guildMember.user);

    if (!userExists) {
        client.funcs.userCache.newUser(guildMember).then((err) => {
            return userJoined(client, guildMember, guildConf, true);
        });
    }

    const serverExists = await client.funcs.userCache.serverExists(guildMember);

    if (!serverExists) {
        return userJoined(client, guildMember, guildConf, true);
    }

    return userJoined(client, guildMember, guildConf, false);

};

userJoined = async (client, guildMember, guildConf, firstTime = true) => {
    if (firstTime) {
        client.funcs.userCache.newServer(guildMember);
    }

    try {
        const newUser = new client.Discord.RichEmbed()
            .setAuthor(`${guildMember.user.tag} (${guildMember.user.id})`, guildMember.user.avatarURL)
            .setColor("#00ff00")
            .setTimestamp()
            .setFooter(`User joined`);
        
        if(!firstTime){
            newUser.setFooter(`User re-joined`);
        }

        const logChannel = await client.channels.get(guildConf.logChannel);

        logChannel.sendEmbed(newUser, '', {
            disableEveryone: true
        });
    } catch (err) {
        client.emit("log", err, "error");
    }
}