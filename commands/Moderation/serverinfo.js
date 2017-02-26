const Discord = require('discord.js');

exports.run = (client, msg) => {
    const serverInfo = new Discord.RichEmbed()
        .setAuthor(`${msg.guild.name}`, msg.guild.iconURL)
        .setColor("#ffffff")
        .addField("ID", `${msg.guild.id}`, true)
        .addField("Name", `${msg.guild.name}`, true)
        .addField("Owner", `<@${msg.guild.ownerID}>`, true)
        .addField("Members", `${msg.guild.memberCount}`, true)
        .addField("Channels", `${msg.guild.channels.size}`, true)
        .addField("Emojis", `${msg.guild.emojis.size}/50`, true)
        .addField("Roles", `${msg.guild.roles.size}, true`, true)
        .addField("Region", `${msg.guild.region}`, true)
        .addField("Created on", `${msg.guild.createdAt}`, true)
        .setThumbnail("http://i.imgur.com/7lSighC.png", 50, 50)
        .setTimestamp()
        .setFooter(`Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);
    msg.channel.sendEmbed(serverInfo, '', {
        disableEveryone: true
    });

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
    guildOnly: true,
    aliases: ["sinfo"],
    permLevel: 2,
    botPerms: [],
    requiredFuncs: []
};

exports.help = {
    name: "serverinfo",
    description: "Displays server information.",
    usage: "",
    usageDelim: ""
};
