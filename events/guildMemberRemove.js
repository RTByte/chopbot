exports.run = async (client, guildMember) => {
	const guildConf = await client.funcs.confs.get(guildMember.guild);

    try {
        const userLeft = new client.Discord.RichEmbed()
            .setAuthor(`${guildMember.user.tag} (${guildMember.user.id})`, guildMember.user.avatarURL)
            .setColor("#ff9b9b")
            .setTimestamp()
            .setFooter(`User left`);
        client.channels.get(guildConf.logChannel).sendEmbed(userLeft, '', {
            disableEveryone: true
        });
    } catch (err) {
        return client.emit("log", err, "error");
    }

};
