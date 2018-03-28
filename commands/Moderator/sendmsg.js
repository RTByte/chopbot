exports.run = async (client, msg, [target, ...message]) => {
    if (await canSend(client, msg, target)) {
        try {
            await msg.delete();
            return target.send(message.join(" "));
        } catch (err) {
            await client.emit("log", err, "error");
            return msg.channel.send(`${client.denyEmoji} It looks like ${target} is not a valid user or channel.`);
        }
    }

    return;
};

canSend = async (client, msg, target) => {
    if (target.constructor.name === "TextChannel") {
        return (target.guild === msg.guild);
    }

    if (target.constructor.name === "User") {
        return (await msg.guild.members.has(target.id));
    }

    return false;

};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["sendmessage", "message", "msg"],
    permLevel: 2,
    botPerms: [],
    requiredFuncs: [],
};

exports.help = {
    name: "sendmsg",
    description: "Sends a message to the specified channel using ChopBot.",
    usage: "<target:user|target:channel> <message:str> [...]",
    usageDelim: " ",
};
