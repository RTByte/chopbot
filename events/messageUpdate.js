exports.run = (client, msg) => {
    const Discord = require('discord.js');
    try {
        const editEmbed = new Discord.RichEmbed()
            .setAuthor(`#${msg.channel.name}`, msg.guild.iconURL)
            .setColor("#4286f4")
            .addField("Message Edit", `**BEFORE:** ${msg.somethingidk.oldMessage}\n**AFTER:** ${msg.stickplshelpme.newMessage}`, true)
            .setTimestamp()
            .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);
        client.channels.get(`${msg.guildConf.logChannel}`).sendEmbed(editEmbed, '', {
            disableEveryone: true
        });
    } catch (err) {
        return;
    }
};
