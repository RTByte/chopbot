exports.run = (client, msg) => {
    const serverInfo = new client.methods.Embed()
        .setAuthor(`${msg.guild.name}`, msg.guild.iconURL())
        .setColor("#ffffff")
        .addField("ID", `${msg.guild.id}`, true)
        .addField("Name", `${msg.guild.name}`, true)
        .addField("Owner", `<@${msg.guild.ownerID}>`, true)
        .addField("Members", `${msg.guild.memberCount}`, true)
        .addField("Channels", `${msg.guild.channels.size}`, true)
        .addField("Emojis", `${msg.guild.emojis.size}/50`, true)
        .addField("Roles", `${msg.guild.roles.size}`, true)
        .addField("Region", `${msg.guild.region}`, true)
        .addField("Created on", `${msg.guild.createdAt}`, true)
        .setThumbnail("http://i.imgur.com/7lSighC.png", 50, 50)
        .setTimestamp()
        .setFooter(`Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL());
    return msg.channel.send('', { disableEveryone: true, embed: serverInfo });
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["sinfo"],
    permLevel: 2,
    botPerms: [],
    requiredFuncs: []
};

exports.help = {
    name: "serverinfo",
    description: "Displays server information.",
    usage: "",
    usageDelim: ""
};
