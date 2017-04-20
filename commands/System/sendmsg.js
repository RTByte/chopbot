const Discord = require("discord.js");

exports.run = (client, msg, [target, ...message]) => {
    let approved = false;

    if((target.constructor.name === "TextChannel") && (target.guild === msg.guild)){
        approved = true;
    } else if((target.constructor.name === "User") && (msg.guild.members.has(target.id))){
        approved = true;
    } else{
        msg.channel.sendMessage(`It looks like ${target} is not a valid user or channel in this server.`);

    }

    if(approved){
        try{
            target.sendMessage(message.join(" "));
        } catch(error){
            msg.channel.sendMessage(`It looks like ${target} is not a valid user or channel.`);
        }
    }
    
    msg.delete();

    // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
    if(client.devLogging){
        const devLogger = new Discord.RichEmbed()
            .setAuthor(`${msg.guild.name}`, msg.guild.iconURL)
            .setColor("#ffffff")
            .addField("Command Content", `${msg.content}`, true)
            .setTimestamp()
            .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);
        client.channels.get('271869758024974336').sendEmbed(devLogger, '', {
            disableEveryone: true
        });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["sendmessage", "message", "msg"],
    permLevel: 2,
    botPerms: [],
    requiredFuncs: [],
};

exports.help = {
    name: "sendmsg",
    description: "Sends message to destination channel or user",
    usage: "<target:user|target:channel> <message:str> [...]",
    usageDelim: " ",
};