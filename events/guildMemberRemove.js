exports.run = (client, guildMember) => {
    const Discord = require('discord.js');

	const guildConf = client.funcs.confs.get(guildMember.guild);

    try {
        const userLeft = new Discord.RichEmbed()
            .setAuthor(`${guildMember.user.username}#${guildMember.user.discriminator} (${guildMember.user.id})`, guildMember.user.avatarURL)
            .setColor("#ff9b9b")
            .setTimestamp()
            .setFooter(`User left`);
        client.channels.get(`${guildConf.logChannel}`).sendEmbed(userLeft, '', {
            disableEveryone: true
        });
    } catch (err) {
        return;
    }

};
