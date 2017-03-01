const Discord = require('discord.js');

exports.run = (client, msg, [commandname]) => {
    let command;
    if (client.commands.has(commandname)) {
        command = commandname;
    } else if (client.aliases.has(commandname)) {
        command = client.aliases.get(commandname);
    }
    if (!command) {
        return msg.channel.sendMessage(`I cannot find the command: \`${commandname}\``);
    }
    client.commands.get(command).conf.enabled = false;
    return msg.channel.sendMessage(`Successfully disabled: \`${commandname}\``);

    // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
    const devLogger = new Discord.RichEmbed()
        .setAuthor(`${msg.guild.name}`, msg.guild.iconURL)
        .setColor("#ffffff")
        .addField("Command Content", `${msg.content}`, true)
        .setTimestamp()
        .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);
    client.channels.get('271869758024974336').sendEmbed(devLogger, '', {
        disableEveryone: true
    });
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
    name: "disable",
    description: "Temporarily disables the command. Resets upon reboot.",
    usage: "<commandname:str>",
    usageDelim: "",
};
