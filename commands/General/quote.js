const Discord = require('discord.js');

exports.run = (client, msg, quotemsg, channel) => {
        try{
            msg.channel.fetchMessage(quotemsg)
                .then(quotedMessage => {
                    let quoteEmbed = new Discord.RichEmbed()
                        .setAuthor(`${quotedMessage.author.username}#${quotedMessage.author.discriminator}`, quotedMessage.author.avatarURL)
                        //.setThumbnail(quotedMessage.author.avatarURL)
                        .setColor("#ffffff")
                        .addField("Message:", `${quotedMessage.content}`, true)
                        .setFooter(`Originally Sent on ${quotedMessage.createdAt}`);
                    msg.channel.sendEmbed(quoteEmbed, '', {disableEveryone:true});
                })
                .catch(console.error);
        } catch (err){
            msg.channel.sendMessage(`Could not find message with ID of ${quotemsg}. I can only quote messages in the same channel they were sent.`);
            return;
        }

    // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
    const devLogger = new Discord.RichEmbed()
        .setAuthor(`${msg.guild.name}`, msg.guild.iconURL)
        .setColor("#ffffff")
        .addField("Command Content", `${msg.content}`, true)
        .setTimestamp()
        .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);
    client.channels.get('271869758024974336').sendEmbed(devLogger, '', {
        disableEveryone: true
    });
};

exports.conf = {
    enabled: true,
    selfbot: false,
    guildOnly: true,
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};

exports.help = {
    name: 'quote',
    description: 'Quotes a message from earlier in the thread by ID',
    usage: '<messageID:str> [channelID:str]',
    usageDelim: ', ',
};