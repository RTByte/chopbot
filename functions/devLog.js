const Discord = require('discord.js');

exports.devLog = function(client, msg, isCommand = false) {
    if(client.devLogging){
        const devLogger = new Discord.RichEmbed()
            .setAuthor(`${msg.guild.name}`, msg.guild.iconURL)
            .setColor("#ffffff")
            .setTimestamp()
            .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);

        if(isCommand){
        	devLogger.addField("Command Content", `${msg.content}`, true);
     		client.channels.get(client.devCommandLogChannel).sendEmbed(devLogger, '', {disableEveryone: true});
        } else {
        	devLogger.addField(`Mention Detected (#${msg.channel.name})`, `${msg.content}`, true);
           	client.channels.get(client.devMentionChannel).sendEmbed(devLogger, '', {disableEveryone: true});
        }

    }
};