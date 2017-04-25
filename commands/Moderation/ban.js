const Discord = require('discord.js');

exports.run = (client, msg, [user, ...args]) => {
    const target = msg.mentions.users.first();
    const executor = msg.author;

    client.funcs.heirarchy.check(executor, target, msg.guild)
    .then(canAct => {
        if(canAct){
            client.fetchUser(target.id)
            if(!msg.content.includes("-s")) {
              target.sendMessage(`You have been banned from the ${msg.guild.name} Discord.\n**Reason:** ${args.toString().split(",").join(" ")}\n\nTo appeal your ban, please respond to this message, detailing why you think you should be unbanned. The owner of the server you were banned from will get back to you when possible.`)}
            msg.guild.member(user).ban(1)
                .then(() => msg.channel.sendMessage(`**${user.username}#${user.discriminator}** was banned.`))
                .catch(e => msg.reply(`There was an error trying to ban: ${e}`));

            try {
                const serverLog = new Discord.RichEmbed()
                    .setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
                    .setColor("#ff0000")
                    .setDescription(`**Member:** ${target.username}#${target.discriminator} (${target.id})\n**Action:** Ban\n**Reason:** ${args.toString().split(",").join(" ")}`)
                    .setTimestamp();
                client.channels.get(`${msg.guildConf.logChannel}`).sendEmbed(serverLog, '', {
                    disableEveryone: true
                });
            } catch (err) {
                return;
            }

        }

    })
    .catch(console.error);

    // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
    client.funcs.devLog.devLog(client, msg, true);

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["b"],
    permLevel: 2,
    botPerms: ["BAN_MEMBERS"],
    requiredFuncs: [],
};

exports.help = {
    name: "ban",
    description: "Bans mentioned user and logs reason.",
    usage: "<user:user> <reason:str> [...]",
    usageDelim: " ",
};
