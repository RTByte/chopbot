const Discord = require('discord.js');
let ccdGuild = '225963025348296705';
let firstRole = '302407219704627200';

exports.run = (client, msg, guild) => {
    let role = msg.guild.roles.find("name", "RT First")
    let user = msg.author.id
    if (msg.guild.id === ccdGuild) {
      msg.guild.member(user).addRole(role)
          .then(() => msg.channel.sendMessage(`Done!`))
            .then(msg2 => msg2.delete(2000))
          .catch(e => msg.reply(`I encountered an error whilst trying to give you the role: ${e}`));
      msg.delete(2200)
    }

    try {
        const serverLog = new Discord.RichEmbed()
            .setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
            .setColor("#ff0fef")
            .setDescription(`Got RT First role.`)
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
    aliases: [],
    permLevel: 2,
    botPerms: [0x10000000],
    requiredFuncs: []
};

exports.help = {
    name: "joinfirst",
    description: "Join the FIRST role and get access to the #first-lounge.",
    usage: "",
    usageDelim: ""
};
