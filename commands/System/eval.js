const inspect = require("util").inspect;
const Discord = require('discord.js');

exports.run = (client, msg, [code]) => {
    try {
        let evaled = eval(code);
        if (typeof evaled !== "string") {
            evaled = inspect(evaled);
        }
        msg.channel.sendCode("xl", client.funcs.clean(client, evaled));
    } catch (err) {
        msg.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${
      client.funcs.clean(err)
      }\n\`\`\``);
    }

    // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
    client.funcs.devLog.devLog(client, msg, true);

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ev"],
    permLevel: 10,
    botPerms: [],
    requiredFuncs: [],
};

exports.help = {
    name: "eval",
    description: "Evaluates arbitrary Javascript. Reserved for bot owner.",
    usage: "<expression:str>",
    usageDelim: "",
};
