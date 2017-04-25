const Discord = require('discord.js');

exports.run = (client, msg) => {
    msg.reply(`${Math.random() > 0.5 ? '🙂 heads' : '🙃 tails'}.`);

    // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
    client.funcs.devLog.devLog(client, msg, true);

};

exports.conf = {
    enabled: true,
    selfbot: false,
    guildOnly: true,
    aliases: ['coin', "flip"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};

exports.help = {
    name: 'coinflip',
    description: 'Flips a (pseudo) coin. 🙂 for heads, 🙃 for tails.',
    usage: '',
    usageDelim: '',
};
