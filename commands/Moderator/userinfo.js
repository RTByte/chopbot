exports.run = async (client, msg, [user]) => {
    const target = msg.mentions.users.first() || msg.author;

    const userInfo = new client.methods.Embed()
        .setAuthor(target.username, target.avatarURL)
        .setColor("#ffffff")
        .addField("ID", target.id, true)
        .addField("Name & Discriminator", target.tag, true)
        .addField("Status", target.presence.status, true)
        .addField("Bot Account", target.bot, true)
        .addField("Joined Discord", target.createdAt, true)
        .setThumbnail("http://i.imgur.com/7lSighC.png", 50, 50)
        .setTimestamp()
        .setFooter(`Requested by ${msg.author.tag}`, msg.author.avatarURL);
    return msg.channel.send('', { disableEveryone: true, embed: userInfo });
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["whois", "uinfo"],
    permLevel: 2,
    botPerms: [],
    requiredFuncs: []
};

exports.help = {
    name: "userinfo",
    description: "Displays user information. Returns your info if no other user is specifed.",
    usage: "[user:user]",
    usageDelim: ""
};
