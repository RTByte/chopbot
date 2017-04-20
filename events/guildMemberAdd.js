exports.run = (client, guildMember) => {
    const Discord = require('discord.js');

	const guildConf = client.funcs.confs.get(guildMember.guild);

    try {
        const newUser = new Discord.RichEmbed()
            .setAuthor(`${guildMember.user.username}#${guildMember.user.discriminator} (${guildMember.user.id})`, guildMember.user.avatarURL)
            .setColor("#00ff00")
            .setTimestamp()
            .setFooter(`User joined`);
        client.channels.get(`${guildConf.logChannel}`).sendEmbed(newUser, '', {
            disableEveryone: true
        });
    } catch (err) {
        return;
    }

};
