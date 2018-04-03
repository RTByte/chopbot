exports.run = async (client, msg, [target, ...reason]) => {
    //Making sure target is fetched, and setting the executor
    target = await client.users.resolve(target.id);
    const executor = msg.author;
    const action = "Ban";
    reason = reason.join(" ");

    //Checking to see if executor can act on target
    const canMod = await client.funcs.hierarchyCheck(client, executor, target, msg.guild).catch((err) => {
        msg.delete();
        return msg.reply(`${client.denyEmoji} It looks like you don't have permission to moderate ${target}. Are they in this server?`);
    });

    //Notify if user can't moderate target
    if (!canMod) {
        msg.delete();
        return msg.reply(`${client.denyEmoji} You don't have permission to moderate ${target}.`);
    }

    if (msg.content.includes ("-s")) {
        //Run silently if specified
        await client.funcs.modNotification(client, executor, target, msg, action, reason, true);
    } else {
        //Run normally
        await client.funcs.modNotification(client, executor, target, msg, action, reason, false);
    }

    /**  ~~~~   Action-specific Code starts here   ~~~~  **/

    //Banning the target user
    return msg.guild.member(target).ban(1, reason)
        .catch((err) => msg.reply(`⚠️ There was an error trying to ban ${target}: ${err}.`));

};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["b"],
    permLevel: 2,
    botPerms: [],
    requiredFuncs: [],
};

exports.help = {
    name: "ban",
    description: "Bans mentioned user and logs reason.",
    usage: "<user:user> <reason:str> [...]",
    usageDelim: " ",
};
