const Discord = require('discord.js');
let ccdGuild = '175339890832179200';
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
    client.funcs.devLog.devLog(client, msg, true);

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0,
    botPerms: [0x10000000],
    requiredFuncs: []
};

exports.help = {
    name: "joinfirst",
    description: "Join the FIRST role and get access to the #first-lounge.",
    usage: "",
    usageDelim: ""
};
