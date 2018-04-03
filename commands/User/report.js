exports.run = async (client, msg, [target, ...reason]) => {
    if (!reason) {
        return msg.reply(`${client.denyEmoji} You must enter a reason for your report.`);
    }

    reason = reason.join(" ");

    target = await client.users.resolve(target.id);

    msg.delete();

    msg.reply("📝 Report received.");

    try {
        const modChat = new client.methods.Embed()
            .setAuthor(target.tag, target.avatarURL())
            .setColor("#fff200")
            .setTitle(`User report in #${msg.channel.name}`)
            .setDescription(`${reason}`)
            .setTimestamp()
            .setFooter(`Reported by ${msg.author.tag}`, msg.author.avatarURL());
        return client.channels.get(msg.guild.settings.logChannel).send(`${msg.guild.roles.find("id", msg.guild.settings.modRole)} ${msg.guild.roles.find("id", msg.guild.settings.adminRole)}`, { disableEveryone: true, embed: modChat });
    } catch (err) {
        return client.emit("log", err, "error");
    }

};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: []
};

exports.help = {
    name: "report",
    description: "Reports mentioned user to the mod team, reason required. Screenshots appreciated.",
    usage: "<target:user> <reason:str> [...]",
    usageDelim: " "
};
