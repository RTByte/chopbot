exports.run = (client, guildMember) => {
    const Discord = require('discord.js');

	const guildConf = client.funcs.confs.get(guildMember.guild);
    
    try {
        const userLeft = new Discord.RichEmbed()
            .setAuthor(`${guildMember.guild.name}`, guildMember.guild.iconURL)
            .setColor("#ff0000")
            .addField(`User Left ${guildMember.guild.name}`, `**${guildMember.user.username}#${guildMember.user.discriminator}** Left ${guildMember.guild.name}! Total Members: ${guildMember.guild.memberCount}`, false)
            .setTimestamp()
            .setFooter(`${guildMember.user.username}#${guildMember.user.discriminator}`, guildMember.user.avatarURL);
        client.channels.get(`${guildConf.logChannel}`).sendEmbed(userLeft, '', {
            disableEveryone: true
        });
    } catch (err) {
        return;
    }

};