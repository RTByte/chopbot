const Discord = require('discord.js');

exports.run = (client, msg, choices) => {
    const validChoices = choices.filter(x => x);

    if (validChoices.length === 1) {
        msg.channel.sendMessage('🤔 You only gave me one choice.');
    } else {
        msg.reply(`🤔 ${choices[Math.floor(Math.random() * choices.length)]}.`);
    }

    // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
    client.funcs.devLog.devLog(client, msg, true);

};

exports.conf = {
    enabled: true,
    selfbot: false,
    guildOnly: true,
    aliases: ['choose', 'decide'],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};

exports.help = {
    name: 'choice',
    description: 'Makes a decision for you given some choices.',
    usage: '<choices:str> [...]',
    usageDelim: ', ',
};
