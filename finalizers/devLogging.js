const now = require("performance-now");

exports.run = (client, msg, mes, start) => {
	if (!client.devLogging) {
		return;
	}

	const devLogger = new client.Discord.RichEmbed()
	    .setAuthor(`${msg.guild.name} - #${msg.channel.name}`, msg.guild.iconURL)
	    .setColor("#ffffff")
	    .setTimestamp()
	    .setFooter(msg.author.tag, msg.author.avatarURL)
	    .addField("Command Content", msg.content, true)
	    .addField("Runtime", (now() - start).toFixed(3) + " ms");

	client.channels.get(client.devLogChannel).sendEmbed(devLogger, '', { disableEveryone: true });
};