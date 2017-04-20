const Discord = require('discord.js');

exports.run = (client, msg, [user, ...args]) => {
    const target = msg.mentions.users.first();
    const targetID = msg.guild.members.get(target.id);

    //Kick user from voice channels if they're in one
    if (!targetID.voiceChannel) {
        //Check to see if user is in a voice channel
        msg.channel.sendMessage(`${target.username} is not in a voice channel.`);
    } else {
        var originChannel = targetID.voiceChannel;
        //Creating temporary channel to move user to
        try {
            msg.guild.createChannel(`kick${target.username}`, `voice`)
                .then(kickChannel => {
                    targetID.setVoiceChannel(kickChannel);
                    //Moving user to temporary channel
                    setTimeout(() => {
                        //Deleting temporary channel after 250ms (Should be long enough that user actually gets moved before it's deleted)
                        kickChannel.delete();
                    }, 250);
                    msg.channel.sendMessage(`Voice-kicked **${target.username}#${target.discriminator}**.`);
                });
        } catch (e) {
            msg.channel.sendMessage(`I couldn't kick ${target.username} from ${originChannel.name} voice chat.`);
        }
        if(!msg.content.includes("-s")) {
        target.sendMessage(`You have been kicked from ${originChannel.name} voice chat.\n**Reason:** ${args.toString().split(",").join(" ")}.\n\nThis action was performed manually by a moderator of the ${msg.guild.name} Discord. If you are confused, or need help, feel free to respond to this message and someone will get back to you soon.`);
        }
    }

    //Local moderation log
    try {
        const serverLog = new Discord.RichEmbed()
            .setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
            .setColor("#ff0000")
            .setDescription(`**Member:** ${target.username}#${target.discriminator} (${target.id})\n**Action:** Voice-kick\n**Reason:** ${args.toString().split(",").join(" ")}`)
            .setTimestamp();
        client.channels.get(`${msg.guildConf.logChannel}`).sendEmbed(serverLog, '', {
            disableEveryone: true
        });
    } catch (err) {
        return;
    }

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
    aliases: ["vkick", "vk"],
    permLevel: 2,
    botPerms: ["MANAGE_CHANNELS", "MOVE_MEMBERS"],
    requiredFuncs: [],
};

exports.help = {
    name: "vckick",
    description: "Kicks user out of voice channel.",
    usage: "<user:user> <reason:str> [...]",
    usageDelim: " ",
};
