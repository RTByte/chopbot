const Discord = require('discord.js');

exports.run = (client, msg, [user]) => {
    const target = msg.mentions.users.first();

    let role = msg.guild.roles.find("name", "Muted")
    client.fetchUser(target.id)
    if(!msg.content.includes("-s")) {
      target.sendMessage(`Your mute on the ${msg.guild.name} Discord has been lifted. You may now send messages.\n\nThis action was performed manually by a moderator of the ${msg.guild.name} Discord. If you are confused, or need help, feel free to respond to this message and someone will get back to you soon.`);}
    msg.guild.member(user).removeRole(role)
        .then(() => msg.channel.sendMessage(`<@${user.id}> was unmuted.`))
        .catch(e => msg.reply(`There was an error trying to unmute: ${e}`));

    try {
        const serverLog = new Discord.RichEmbed()
            .setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
            .setColor("#ff7200")
            .setDescription(`**Member:** ${target.username}#${target.discriminator} (${target.id})\n**Action:** Unmute`)
            .setTimestamp();
        client.channels.get(`${msg.guildConf.logChannel}`).sendEmbed(serverLog, '', {
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
    aliases: ["um"],
    permLevel: 2,
    botPerms: [0x10000000],
    requiredFuncs: []
};

exports.help = {
    name: "unmute",
    description: "Unmutes mentioned user and logs it.",
    usage: "<user:user>",
    usageDelim: ""
};
