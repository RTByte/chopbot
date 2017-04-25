const Discord = require('discord.js');

exports.run = (client, msg, [cmd]) => {
    if (!cmd) {
        const helpMessage = new Discord.RichEmbed()
            .setAuthor("Moderation Commands", client.user.avatarURL)
            .setColor("#ffffff")
            .addField("-modhelp [command]", "Provides moderation command help. Goes into detail if a command is specified.")
            .addField("-warn <@user> <...reason>", "Warns mentioned user and logs reason.\nAliases: *'w'*")
            .addField("-mute <@user> <...reason>", "Mutes mentioned user and logs reason.\nAliases: *'m'*", true)
            .addField("-unmute <@user>", "Unmutes mentioned user and logs it.\nAliases: *'um'*", true)
            .addField("-kick <@user> <...reason>", "Kicks mentioned user and logs reason.\nAliases: *'k'*")
            .addField("-vckick <@user> <...reason>", "Voice-kicks mentioned user and logs reason.\nAliases: *'vkick'*, *'vckick'*, *'vk'*")
            .addField("-ban <@user> <...reason>", "Bans mentioned user and logs reason.\nAliases: *'b'*")
            .addField("-softban <@user> <...reason>", "Kicks mentioned user and deletes all of their messages from the past 24h, logs reason.\nAliases: *'sb'*")
            .addField("-vcban <@user> <...reason>", "Voice-bans mentioned user and logs reason.\nAliases: *'vban'*, *'vb'*", true)
            .addField("-vcunban <@user>", "Remove mentioned user's voice-ban and logs it.\nAliases: *'vub'*, *'voiceunban'*", true)
            .addField("-sendmessage <@user/#channel> <message>", "Has ChopBot send a message to either a user or channel.\nAliases: *'sendmsg'*, *'message'*, *'msg'*")
            .addField("-purge [@user] <amount>", "Removes specified amount of messages from a channel, by user, if specified.\nAliases: *'prune'*, *'p'*")
            .addField("-userinfo [@user]", "Displays user information. Returns your info if no other user is specified.\nAliases: *'uinfo'*, *'whois'*", true)
            .addField("-serverinfo", "Displays server information.\nAliases: *'sinfo'*", true)
            .addField("-stats", "Displays bot statistics.\nAliases: *'statistics'*")
            .setFooter("Add \"-s\" to the end of any command that requires a reason to bypass DMing the targeted user with it.");
        msg.author.sendEmbed(helpMessage, '', {
            disableEveryone: true
        });
        msg.reply("Sent you a DM with information.")
    } else if (client.commands.has(cmd)) {
        cmd = client.commands.get(cmd);
        const helpMessageCMD = new Discord.RichEmbed()
            .setAuthor(`${cmd.help.name}`, client.user.avatarURL)
            .setColor("#ffffff")
            .setTitle(`${cmd.help.description}`)
            .setDescription(`\`${client.funcs.fullUsage(client, cmd)}\``);
        msg.author.sendEmbed(helpMessageCMD, '', {
            disableEveryone: true
        });
        msg.reply("Sent you a DM with information.")
    }

    // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
    client.funcs.devLog.devLog(client, msg, true);

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 2,
    botPerms: [],
    requiredFuncs: [],
};

exports.help = {
    name: "modhelp",
    description: "Provides moderation command help. Goes into detail if a command is specified.",
    usage: "[command:str]",
    usageDelim: "",
};
