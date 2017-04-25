const Discord = require('discord.js');

exports.run = (client, msg) => {

    // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
    client.funcs.devLog.devLog(client, msg, true);


    msg.channel.sendMessage("Killing bot. Restart required.")
    client.funcs.log("Disconnected via developer command. Restart required.", "warn");
    process.exit(0);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 10,
    botPerms: [],
    requiredFuncs: [],
};

exports.help = {
    name: "kill",
    description: "Kills all bot processes. Can only be executed by a developer.",
    usage: "",
    usageDelim: "",
};
