exports.run =  async (client, msg, [messageID, origin]) => {
    if(origin){
        //Checks to see if command was executed with a channel mention
        if((origin.constructor.name === "TextChannel")){
            //Grabbing message from specified channel
            try{
                client.channels.get(origin.id).fetchMessage(messageID).then(quotedMessage => {
                        let quoteEmbed = new client.Discord.RichEmbed()
                            .setAuthor(`${quotedMessage.author.username}#${quotedMessage.author.discriminator}`, quotedMessage.author.avatarURL)
                            .setColor("#ffffff")
                            .addField("Message:", `${quotedMessage.content}`, true)
                            .setFooter(`Originally Sent on ${quotedMessage.createdAt} in #${quotedMessage.channel.name} on ${quotedMessage.guild.name} Discord`);
                        return msg.channel.sendEmbed(quoteEmbed, '', {disableEveryone:true});
                    })
                    .catch((err) => client.emit("log", err, "error"));

            } catch (err){
                client.emit("log", err, "error");
                return msg.reply(`Could not find message with ID of ${messageID} in ${origin}. Check to make sure I can see that channel.`);
            }
        } else if((origin.constructor.name === "User")){
            //TODO: Allow quoting by user(?) Probably just quote newest message?

        } else{
            return msg.reply(`It looks like ${origin} is not a valid channel.`);
        }
    } else {
        //Grabbing Message from this channel
        try{
            
            msg.channel.fetchMessage(messageID)
                .then(quotedMessage => {
                    let quoteEmbed = new client.Discord.RichEmbed()
                        .setAuthor(`${quotedMessage.author.username}#${quotedMessage.author.discriminator}`, quotedMessage.author.avatarURL)
                        .setColor("#ffffff")
                        .addField("Message:", `${quotedMessage.content}`, true)
                        .setFooter(`Originally Sent on ${quotedMessage.createdAt}`);
                    return msg.channel.sendEmbed(quoteEmbed, '', {disableEveryone:true});
                })
                .catch((err) => client.emit("log", err, "error"));
        } catch (err){
            client.emit("log", err, "error");
            return msg.reply(`Could not find message with ID of ${messageID} in this channel.`);
        }
    }
};

exports.conf = {
    enabled: true,
    runIn: ["text", "dm", "group"],
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