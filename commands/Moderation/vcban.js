const Discord = require('discord.js');

exports.run = (client, msg, [user, ...args]) => {
    const target = msg.mentions.users.first();
    const targetID = msg.guild.members.get(target.id);
    let role = msg.guild.roles.find("name", "VC Banned");

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
                });
        } catch (e) {
            msg.channel.sendMessage(`I couldn't kick ${target.username} from ${originChannel.name} voice chat.`);
        }
    }

    //Giving the user the Voice Chat Banned role
    msg.guild.member(targetID).addRole(role)
        .then(() => msg.channel.sendMessage(`Voice-banned **${target.username}#${target.discriminator}**.`))
        .catch(e => msg.reply(`There was an error trying to voice-ban ${target.username} (${e})`));
    //DMing the user to inform them of their voice chat ban
    if(!msg.content.includes("-s")) {
      target.sendMessage(`You have been voice-banned from the ${msg.guild.name} Discord. You will not be able to connect to any voice channel until this has been lifted.\n**Reason:** ${args.toString().split(",").join(" ")}.\n\nThis action was performed manually by a moderator of the ${msg.guild.name} Discord. If you are confused, or need help, feel free to respond to this message and someone will get back to you soon.`);
    }

    //Local moderation log
    try {
        const serverLog = new Discord.RichEmbed()
            .setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
            .setColor("#ff0000")
            .setDescription(`**Member:** ${target.username}#${target.discriminator} (${target.id})\n**Action:** Voice-ban\n**Reason:** ${args.toString().split(",").join(" ")}`)
            .setTimestamp();
        client.channels.get(`${msg.guildConf.logChannel}`).sendEmbed(serverLog, '', {
            disableEveryone: true
        });
    } catch (err) {
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
    guildOnly: true,
    aliases: ["vban", "vb"],
    permLevel: 2,
    botPerms: ["MANAGE_CHANNELS", "MOVE_MEMBERS", "MANAGE_ROLES_OR_PERMISSIONS"],
    requiredFuncs: [],
};

exports.help = {
    name: "vcban",
    description: "Bans user from entering voice channels.",
    usage: "<user:user> <reason:str> [...]",
    usageDelim: " ",
};
