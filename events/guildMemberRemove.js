exports.run = async (client, guildMember) => {

    //Stop the bot from trying to post if it's the one leaving the server
    if (guildMember.id === client.user.id) {
        //Sending a message to dev log that bot was removed from a guild
        try {
            const newGuild = new client.methods.Embed()
                .setAuthor(`${guildMember.guild.name} (${guildMember.guild.id})`, guildMember.guild.iconURL())
                .setColor("#ff0000")
                .setTimestamp()
                .setFooter("Bot removed from guild");

            const logChannel = await client.channels.get(client.devLogChannel);

            await logChannel.send('', { disableEveryone: true, embed: newGuild });
        } catch (err) {
            await client.emit("log", err, "error");
        }

        return;
    }

    try {
        const userLeft = new client.methods.Embed()
            .setAuthor(`${guildMember.user.tag} (${guildMember.user.id})`, guildMember.user.avatarURL())
            .setColor("#ff9b9b")
            .setTimestamp()
            .setFooter(`User left`);
        return client.channels.get(guildMember.guild.settings.logChannel).send('', { disableEveryone: true, embed: userLeft });
    } catch (err) {
        return client.emit("log", err, "error");
    }

};
