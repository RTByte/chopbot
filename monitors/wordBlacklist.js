const Discord = require('discord.js');

exports.conf = {
    enabled: true,
};

exports.run = (client, msg) => {
    client.funcs.wordBlacklist.check(client, msg.content)
    .then((hasFilteredWord, word) => {
        if(hasFilteredWord){
            try {
                const blacklistEmbed = new Discord.RichEmbed()
                    .setAuthor(`#${msg.channel.name}`, msg.guild.iconURL)
                    .setColor("#ff0000")
                    .addField("Blacklisted word detected. Message deleted.", `${msg.content}`, true)
                    .setTimestamp()
                    .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
                client.channels.get(`${msg.guildConf.logChannel}`).sendEmbed(blacklistEmbed, '', {
                    disableEveryone: true
                });
            } catch (err) {
                client.emit("log", err, "error");
            }
        }
    });
};


