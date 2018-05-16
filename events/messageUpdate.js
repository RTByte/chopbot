exports.run = async (client, msg, newmsg) => {

    if(msg.content === newmsg.content) return;
    if(!msg || !msg.id || !msg.content || !msg.guild) return;

    const editEmbed = new client.methods.Embed()
        .setAuthor(`#${msg.channel.name}`, msg.guild.iconURL())
        .setColor("#4286f4")
        .setTitle("Message edited")
        .addField("BEFORE", `${msg.cleanContent}`)
        .addField("AFTER", `${newmsg.cleanContent}`)
        .setTimestamp()
        .setFooter(msg.author.tag, msg.author.avatarURL());
    return client.channels.get(msg.guild.settings.logChannel).send('', { disableEveryone: true, embed: editEmbed });
    
    return client.emit("log", err, "error");
};
