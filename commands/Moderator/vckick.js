exports.run = async (client, msg, [target, ...reason]) => {
    //Making sure target is fetched, and setting the executor
    target = await client.users.resolve(target.id);
    const executor = msg.author;
    const action = "VC Kick";
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

    const targetMember = await msg.guild.members.resolve(target);

    //Kick user from voice channel if they're in one
    if (targetMember.voiceChannel) {
        const originChannel = targetMember.voiceChannel;

        try {
            const kickChannel = await msg.guild.createChannel(`kick${target.username}`, 'voice');
            await targetMember.setVoiceChannel(kickChannel);
            await setTimeout(() => {
                return kickChannel.delete();
            }, 250);
        } catch (err) {
            return client.emit("log", err, "error");
        }
    }

};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["vkick", "vk"],
    permLevel: 2,
    botPerms: [],
    requiredFuncs: [],
};

exports.help = {
    name: "vckick",
    description: "Kicks user from voice if they are in a voice channel.",
    usage: "<user:user> <reason:str> [...]",
    usageDelim: " ",
};
