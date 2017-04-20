const Discord = require('discord.js');

exports.run = (client, msg, [user, ...args]) => {
    const target = msg.mentions.users.first();
    msg.author.sendMessage(`Report received.`)
    msg.delete()
    try {
        const modChat = new Discord.RichEmbed()
            .setAuthor(`${target.username}#${target.discriminator}`, target.avatarURL)
            .setColor("#fff200")
            .setTitle(`User report in #${msg.channel.name} (SILENT)`)
            .setDescription(`${args.toString().split(",").join(" ")}`)
            .setTimestamp()
            .setFooter(`Reported by ${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);
        client.channels.get(`${msg.guildConf.modChat}`).sendEmbed(modChat, '', {
            disableEveryone: true
        });
    } catch (err) {
        return;
    }

    // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
    if(client.devLogging){
        const devLogger = new Discord.RichEmbed()
            .setAuthor(`${msg.guild.name}`, msg.guild.iconURL)
            .setColor("#ffffff")
            .addField("Command Content", `${msg.content}`, true)
            .setTimestamp()
            .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);
        client.channels.get('271869758024974336').sendEmbed(devLogger, '', {
            disableEveryone: true
        });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["silentr", "silentreport"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: []
};

exports.help = {
    name: "sreport",
    description: "Silent version of the report command. Deletes all traces of the report being made.",
    usage: "<user:user> <reason:str> [...]",
    usageDelim: " "
};
