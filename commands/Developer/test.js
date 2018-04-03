exports.run = async (client, msg) => {
    await client.emit("log", "Testing Log");
    await client.emit("log", "Testing Debug", "debug");
    await client.emit("log", "Testing Warn", "warn");
    await client.emit("log", "Testing Error", "error");

    const testEmbed = new client.methods.Embed()
        .setAuthor(msg.author.tag, msg.author.avatarURL())
        .setColor("#4286f4")
        .addField("Status:", "Test Executed", true);

    return msg.channel.send("", { disableEveryone: true, embed: testEmbed});
};

exports.conf = {
    enabled: true,
    runIn: ["text", "dm", "group"],
    aliases: [],
    permLevel: 10,
    botPerms: ["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "VIEW_CHANNEL", "SEND_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "READ_MESSAGE_HISTORY", "USE_EXTERNAL_EMOJIS", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_EMOJIS"],
    requiredFuncs: [],
};

exports.help = {
    name: "test",
    description: "This is a test command.",
    usage: "",
    usageDelim: "",
    type: "debug",
};
