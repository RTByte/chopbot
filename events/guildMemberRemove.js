exports.run = async (client, guildMember) => {

    //Stop the bot from trying to post if it's the one leaving the server
    if (guildMember.id === client.user.id) {
        //TODO: Notify developer log that bot was removed from a server
        return;
    }

    try {
        const userLeft = new client.methods.Embed()
            .setAuthor(`${guildMember.user.tag} (${guildMember.user.id})`, guildMember.user.avatarURL)
            .setColor("#ff9b9b")
            .setTimestamp()
            .setFooter(`User left`);
        return client.channels.get(guildMember.guild.settings.logChannel).send('', { disableEveryone: true, embed: userLeft });
    } catch (err) {
        return client.emit("log", err, "error");
    }

};
