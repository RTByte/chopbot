exports.run = (client, guildMember) => {
    const Discord = require('discord.js');

	const guildConf = client.funcs.confs.get(guildMember.guild);
    
    try {
        const newUser = new Discord.RichEmbed()
            .setAuthor(`${guildMember.guild.name}`, guildMember.guild.iconURL)
            .setColor("#00ff00")
            .addField(`User Joined ${guildMember.guild.name}`, `**${guildMember.user.username}#${guildMember.user.discriminator}** Joined ${guildMember.guild.name}! Total Members: ${guildMember.guild.memberCount}`, false)
            .setTimestamp()
            .setFooter(`${guildMember.user.username}#${guildMember.user.discriminator}`, guildMember.user.avatarURL);
        client.channels.get(`${guildConf.logChannel}`).sendEmbed(newUser, '', {
            disableEveryone: true
        });
    } catch (err) {
        return;
    }

};