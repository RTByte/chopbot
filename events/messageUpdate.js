exports.run = (client, msg) => {
    const Discord = require('discord.js');
    msg.channel.fetchMessage(msg.id)
        .then(newMessage => {
            try {
                const editEmbed = new Discord.RichEmbed()
                    .setAuthor(`#${msg.channel.name}`, msg.guild.iconURL)
                    .setColor("#4286f4")
                    .setTitle("Message Edited")
                    .addField("BEFORE", `${msg.edits[0]}`)
                    .addField("AFTER", `${newMessage.content}`)
                    .setTimestamp()
                    .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);
                client.channels.get(`${msg.guildConf.logChannel}`).sendEmbed(editEmbed, '', {
                    disableEveryone: true
                });
            } catch (err) {
                return;
            }
        })
};
