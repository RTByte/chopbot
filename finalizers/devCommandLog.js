exports.run = async (client, msg, mes, start) => {
    if (!client.devLogging) return;

    const devLogger = new client.methods.Embed()
        .setColor("#ffffff")
        .addField("Command Content", msg.content, true)
        .setTimestamp()
        .setFooter(msg.author.tag, msg.author.avatarURL());

    if (!msg.guild) {
        devLogger.setAuthor("Direct/Group Message", msg.author.avatarURL());
    } else {
        devLogger.setAuthor(`${msg.guild.name} - #${msg.channel.name}`, msg.guild.iconURL());
    }

    return client.channels.get(client.devLogChannel).send('', { disableEveryone: true, embed: devLogger });
};