exports.run =  async (client, msg, [messageID, origin]) => {
    if(origin){
        //Checks to see if command was executed with a channel mention
        if((origin.constructor.name === "TextChannel")){
            //Grabbing message from specified channel
            try{
                const quotedMessage = await client.channels.get(origin.id).messages.fetch(messageID);
                
                let quoteEmbed = new client.methods.Embed()
                    .setAuthor(quotedMessage.author.tag, quotedMessage.author.avatarURL())
                    .setColor("#ffffff")
                    .addField("Message:", `${quotedMessage.content}`, true)
                    .setFooter(`Originally sent on ${quotedMessage.createdAt} in #${quotedMessage.channel.name} on the ${quotedMessage.guild.name} Discord`);
                
                return msg.channel.sendEmbed(quoteEmbed, '', {disableEveryone:true});
            } catch (err){
                client.emit("log", err, "error");
                return msg.reply(`${client.denyEmoji} Could not find a message with ID of ${messageID} in ${origin}. Check to make sure I can see that channel.`);
            }
        } else if((origin.constructor.name === "User")){
            //TODO: Allow quoting by user(?) Probably just quote newest message?

        } else{
            return msg.reply(`${client.denyEmoji} It looks like ${origin} is not a valid channel.`);
        }
    } else {
        //Grabbing Message from this channel
        try{
            const quotedMessage = await msg.channel.messages.fetch(messageID);
            
            let quoteEmbed = new client.methods.Embed()
                .setAuthor(quotedMessage.author.tag, quotedMessage.author.avatarURL())
                .setColor("#ffffff")
                .addField("Message:", `${quotedMessage.content}`, true)
                .setFooter(`Originally Sent on ${quotedMessage.createdAt}`);
            
            return msg.channel.sendEmbed(quoteEmbed, '', {disableEveryone:true});
        } catch (err){
            client.emit("log", err, "error");
            return msg.reply(`${client.denyEmoji} Could not find message with ID of ${messageID} in this channel.`);
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
