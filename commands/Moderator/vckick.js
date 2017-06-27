exports.run = async (client, msg, [target, ...reason]) => {
    //Making sure target is fetched, and setting the executor
    target = await client.fetchUser(target.id);
    const executor = msg.author;
    const action = "VCKick";
    reason = reason.toString().split(",").join(" ");

    //Checking to see if executor can act on target
    const canMod = await client.funcs.hierarchyCheck(client, executor, target, msg.guild).catch((err) => {
        msg.delete();
        return msg.reply(`It looks like you don't have permission to moderate ${target}. Are they in this server?`);
    });

    //Notify if user can't moderate target
    if (!canMod) {
        msg.delete();
        return msg.reply(`You don't have permission to moderate ${target}`);
    }

    if (msg.content.includes ("-s")) {
        //Run silently if specified
        await client.funcs.modNotification(client, executor, target, msg.channel, action, reason, true);
    } else {
        //Run normally
        await client.funcs.modNotification(client, executor, target, msg.channel, action, reason, false);
    }
    
    /**  ~~~~   Action-specific Code starts here   ~~~~  **/

    //Kick user from voice channel if they're in one
    if (target.voiceChannel) {
        const oirginChannel = target.voiceChannel;

        try {
            const kickChannel = await msg.guild.createChannel(`kick${target.username}`, 'voice');
            await target.setVoiceChannel(kickChannel);
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
    botPerms: ["MANAGE_CHANNELS", "MOVE_MEMBERS"],
    requiredFuncs: [],
};

exports.help = {
    name: "vckick",
    description: "Kicks user out of voice channel.",
    usage: "<user:user> <reason:str> [...]",
    usageDelim: " ",
};
