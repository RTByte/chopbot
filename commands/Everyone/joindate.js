exports.run = async (client, msg, [target = msg.author]) => {
    const targetMember = await msg.guild.members.resolve(target);

    const me = new client.methods.Embed()
        .setAuthor(target.tag, target.avatarURL())
        .setColor("#4286f4")
        .addField("Joined Discord", target.createdAt, true)
        .addField("Joined Server", targetMember.joinedAt, true)
        .setThumbnail("http://i.imgur.com/7lSighC.png", 50, 50)
    return msg.send('', { disableEveryone: true, embed: me });
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["me", "myself", "age"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: []
};

exports.help = {
    name: "joindate",
    description: "Displays your account creation date along with the date you joined the current server you're on. Other users can be specified to fetch their account creation and server join dates.",
    usage: "[target:mention]",
    usageDelim: ""
};
