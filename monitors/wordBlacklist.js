exports.conf = {
    enabled: true,
};

exports.run = (client, msg) => {
    client.funcs.wordBlacklist.check(client, msg.content)
    .then((hasFilteredWord, word) => {
        if(hasFilteredWord && !msg.member.roles.has(msg.guild.settings.whitelistedRole)){
            msg.delete().then(() => {
                try {
                    const blacklistEmbed = new client.methods.Embed()
                        .setAuthor(`#${msg.channel.name}`, msg.guild.iconURL())
                        .setColor("#ff0000")
                        .addField("Blacklisted word detected. Message deleted.", `${msg.content}`, true)
                        .setTimestamp()
                        .setFooter(msg.author.tag, msg.author.avatarURL())
                    client.channels.get(msg.guild.settings.logChannel).send('', { disableEveryone: true, embed: blacklistEmbed });
                } catch (err) {
                    client.emit("log", err, "error");
                }
            });

        }
    });
};
