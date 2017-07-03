exports.run = async (client, msg) => {
    await client.emit("log", "Testing Log");
    await client.emit("log", "Testing Debug", "debug");
    await client.emit("log", "Testing Warn", "warn");
    await client.emit("log", "Testing Error", "error");
    
    const testEmbed = new client.methods.Embed()
        .setAuthor(msg.author.tag, msg.author.avatarURL)
        .setColor("#4286f4")
        .addField("Status:", "Test Executed", true);

    return msg.channel.send("", { disableEveryone: true, embed: testEmbed});
};

exports.conf = {
    enabled: true,
    runIn: ["text", "dm", "group"],
    aliases: [],
    permLevel: 10,
    botPerms: ["MANAGE_ROLES", "MOVE_MEMBERS", "DEAFEN_MEMBERS", "MUTE_MEMBERS", "SPEAK", "CONNECT", "USE_EXTERNAL_EMOJIS", "MENTION_EVERYONE", "READ_MESSAGE_HISTORY", "ATTACH_FILES", "EMBED_LINKS", "MANAGE_MESSAGES", "SEND_MESSAGES", "READ_MESSAGES", "VIEW_AUDIT_LOG", "ADD_REACTIONS", "MANAGE_CHANNELS", "BAN_MEMBERS", "KICK_MEMBERS"],
    requiredFuncs: [],
};

exports.help = {
    name: "test",
    description: "This is a test command. Expect it to change a lot...",
    usage: "",
    usageDelim: "",
    type: "debug",
};
