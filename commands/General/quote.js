const Discord = require("discord.js");

exports.run = (client, msg, [messageID, origin]) => {
    if(origin){
        //Checks to see if command was executed with a channel mention
        if((origin.constructor.name === "TextChannel")){
            //Grabbing message from specified channel
            try{
                client.channels.get(origin.id).fetchMessage(messageID).then(quotedMessage => {
                        let quoteEmbed = new Discord.RichEmbed()
                            .setAuthor(`${quotedMessage.author.username}#${quotedMessage.author.discriminator}`, quotedMessage.author.avatarURL)
                            .setColor("#ffffff")
                            .addField("Message:", `${quotedMessage.content}`, true)
                            .setFooter(`Originally Sent on ${quotedMessage.createdAt}`);
                        msg.channel.sendEmbed(quoteEmbed, '', {disableEveryone:true});
                    })
                    .catch(console.error);

            } catch (err){
                client.funcs.log(err, "warn");
                msg.channel.sendMessage(`Could not find message with ID of ${messageID} in ${origin}. Check to make sure I can see that channel.`);
                return;
            }
        } else if((origin.constructor.name === "User")){
            //TODO: Allow quoting by user(?) Probably just quote newest message?

        } else{
            msg.channel.sendMessage(`It looks like ${origin} is not a valid channel.`);

        }
    } else {
        //Grabbing Message from this channel
        try{
            
            msg.channel.fetchMessage(messageID)
                .then(quotedMessage => {
                    let quoteEmbed = new Discord.RichEmbed()
                        .setAuthor(`${quotedMessage.author.username}#${quotedMessage.author.discriminator}`, quotedMessage.author.avatarURL)
                        .setColor("#ffffff")
                        .addField("Message:", `${quotedMessage.content}`, true)
                        .setFooter(`Originally Sent on ${quotedMessage.createdAt}`);
                    msg.channel.sendEmbed(quoteEmbed, '', {disableEveryone:true});
                })
                .catch(console.error);
        } catch (err){
            msg.channel.sendMessage(`Could not find message with ID of ${messageID} in this channel.`);
            return;
        }
    }


    // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
    client.funcs.devLog.devLog(client, msg, true);

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};

exports.help = {
    name: "quote",
    description: "Quotes a message by ID.",
    usage: "<messageID:str> [origin:channel]",
    usageDelim: " ",
};