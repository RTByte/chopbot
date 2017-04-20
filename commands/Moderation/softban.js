const Discord = require('discord.js');

exports.run = (client, msg, [user, ...args]) => {
    const target = msg.mentions.users.first();
    const targetID = client.fetchUser(target.id);
    if(!msg.content.includes("-s")) {
      target.sendMessage(`Your messages from the past 24 hours have been removed, and you have been kicked from the ${msg.guild.name} Discord.\n**Reason:** ${args.toString().split(",").join(" ")}.\n\nThis action was performed manually by a moderator of the ${msg.guild.name} Discord. If you are confused, or need help, feel free to respond to this message and someone will get back to you soon.`);}

    //Banning User (Kicks them and deletes their messages)
    msg.guild.member(target).ban(1)
        .then(() => msg.channel.sendMessage(`**${target.username}#${target.discriminator}** was softbanned.`))
        .catch(e => msg.reply(`There was an error trying to ban: ${e}`));

    //Unbanning User after 1 second (Putting the 'soft' in 'softban')
    setTimeout(() => {
        msg.guild.unban(target)
            .then()
            .catch(e => msg.reply(`There was an error trying to unban: ${e}`));
    }, 1000);

    try {
        const serverLog = new Discord.RichEmbed()
            .setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
            .setColor("#ff0000")
            .setDescription(`**Member:** ${target.username}#${target.discriminator} (${target.id})\n**Action:** Softban\n**Reason:** ${args.toString().split(",").join(" ")}`)
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
    aliases: ["sb"],
    permLevel: 2,
    botPerms: ["BAN_MEMBERS"],
    requiredFuncs: [],
};

exports.help = {
    name: "softban",
    description: "Kicks user from server and removes all their messages that were sent in the past 24 hours.",
    usage: "<user:user> <reason:str> [...]",
    usageDelim: " ",
};
