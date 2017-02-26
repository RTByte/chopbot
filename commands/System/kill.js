const Discord = require('discord.js');

exports.run = (client, msg) => {

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
