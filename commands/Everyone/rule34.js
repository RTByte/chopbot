// Yes, this is a joke.
exports.run = async (client, msg, [...subject]) => {
    msg.reply(`No.`)
    .then(reply => {
        setTimeout(() => {
            reply.delete();
            return msg.delete();
        }, 5000);
    })
    .catch((err) => client.emit("log", err, "error"));
};

exports.conf = {
    enabled: true,
    runIn: ["text", "dm", "group"],
    aliases: ["r34"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: []
};

exports.help = {
    name: "rule34",
    description: "This is a meme, we didn't actually add a rule34 command.",
    usage: "[subject:str]",
    usageDelim: " "
};
