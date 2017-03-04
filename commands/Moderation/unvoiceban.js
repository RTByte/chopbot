const Discord = require('discord.js');

exports.run = (client, msg, [user]) => {
    const target = msg.mentions.users.first();
    const targetID = msg.guild.members.get(target.id);
    let role = msg.guild.roles.find("name", "VC Banned");

    //Removing Voice Chat Banned role from user
    msg.guild.member(targetID).removeRole(role)
        .then(() => msg.channel.sendMessage(`Voice-unbanned ${target.username}.`))
        .catch(e => msg.reply(`There was an error trying to remove ${target.username}'s voice-ban (${e})`));
    //DMing the user to inform them of their ban being lifted
    targetID.sendMessage(`Your voice-ban on the ${msg.guild.name} has been lifted. You can connect to voice channels again.`);


    try {
        const serverLog = new Discord.RichEmbed()
            .setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
            .setColor("#ff7200")
            .setDescription(`**Member:** ${target.username}#${target.discriminator} (${target.id})\n**Action:** Voice-unban`)
            .setTimestamp();
        client.channels.get(`${msg.guildConf.logChannel}`).sendEmbed(serverLog, '', {
            disableEveryone: true
        });
    } catch (err) {
        return;
    }

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
    aliases: ["uvban", "uvb"],
    permLevel: 2,
    botPerms: ["MANAGE_ROLES_OR_PERMISSIONS"],
    requiredFuncs: []
};

exports.help = {
    name: "uvcban",
    description: "Unbans user from server's voice channels",
    usage: "<user:user>",
    usageDelim: ""
};
