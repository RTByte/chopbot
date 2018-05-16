exports.run = (client, msg) => {
    
    const deleteEmbed = new client.methods.Embed()
        .setAuthor(`#${msg.channel.name}`, msg.guild.iconURL())
        .setColor("#4286f4")
        .addField("Message deleted", `${msg.content}`, true)
        .setTimestamp()
        .setFooter(msg.author.tag, msg.author.avatarURL());
    client.channels.get(msg.guild.settings.logChannel).send('', { disableEveryone: true, embed: deleteEmbed });
    
    return client.emit("log", err, "error");
};
