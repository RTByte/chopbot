// Yes, this is a joke.
exports.run = (client, msg, [...args]) => {
    msg.reply(`No.`)
    .then(reply => {
        setTimeout(() => {
            reply.delete();
            msg.delete();
        }, 5000);
    })
    .catch(console.error);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: []
};

exports.help = {
    name: "rule34",
    description: "Search for rule34",
    usage: "[subject:str]",
    usageDelim: " "
};
