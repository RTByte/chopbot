const Discord = require('discord.js');

exports.run = (client, msg, [user]) => {
    const target = msg.mentions.users.first() || msg.author;

    const userInfo = new Discord.RichEmbed()
        .setAuthor(`${target.username}`, target.avatarURL)
        .setColor("#ffffff")
        .addField("ID", `${target.id}`, true)
        .addField("Name & Discriminator", `${target.username}#${target.discriminator}`, true)
        .addField("Status", `${target.presence.status}`, true)
        .addField("Bot Account", `${target.bot}`, true)
        .addField("Joined Discord", `${target.createdAt}`, true)
        .setThumbnail("http://i.imgur.com/7lSighC.png", 50, 50)
        .setTimestamp()
        .setFooter(`Requested by ${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);
    msg.channel.sendEmbed(userInfo, '', {
        disableEveryone: true
    });

    // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
    client.funcs.devLog.devLog(client, msg, true);

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["whois", "uinfo"],
    permLevel: 2,
    botPerms: [],
    requiredFuncs: []
};

exports.help = {
    name: "userinfo",
    description: "Displays user information. Returns your info if no other user is specifed.",
    usage: "[user:user]",
    usageDelim: ""
};
