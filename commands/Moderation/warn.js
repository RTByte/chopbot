const Discord = require('discord.js');

exports.run = (client, msg, [user, ...args]) => {
    const target = msg.mentions.users.first();
    const executor = msg.author;

    client.funcs.heirarchy.check(executor, target, msg.guild)
    .then(canAct => {
        if(canAct){
            client.fetchUser(target.id)
            target.sendMessage(`You've received a warning in the ${msg.guild.name} Discord.\n**Reason:** ${args.toString().split(",").join(" ")}.\n\nThis action was performed manually by a moderator of the ${msg.guild.name} Discord. If you are confused, or need help, feel free to respond to this message and someone will get back to you soon.`);
            msg.channel.sendMessage(`Warned <@${user.id}>.`)

            try {
                const serverLog = new Discord.RichEmbed()
                    .setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
                    .setColor("#fff200")
                    .setDescription(`**Member:** ${target.username}#${target.discriminator} (${target.id})\n**Action:** Warn\n**Reason:** ${args.toString().split(",").join(" ")}`)
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
    aliases: ["w"],
    permLevel: 2,
    botPerms: [],
    requiredFuncs: []
};

exports.help = {
    name: "warn",
    description: "Warns mentioned user and logs reason.",
    usage: "<user:user> <reason:str> [...]",
    usageDelim: " "
};
