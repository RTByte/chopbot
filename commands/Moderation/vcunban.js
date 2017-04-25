const Discord = require('discord.js');

exports.run = (client, msg, [user]) => {
    const target = msg.mentions.users.first();
    const executor = msg.author;

    client.funcs.heirarchy.check(executor, target, msg.guild)
    .then(canAct => {
        if(canAct){
            const targetID = msg.guild.members.get(target.id);
            let role = msg.guild.roles.find("name", "VC Banned");

            //Removing Voice Chat Banned role from user
            msg.guild.member(targetID).removeRole(role)
                .then(() => msg.channel.sendMessage(`Voice-unbanned **${target.username}#${target.discriminator}**.`))
                .catch(e => msg.reply(`There was an error trying to remove ${target.username}'s voice-ban (${e})`));
            //DMing the user to inform them of their ban being lifted
            if(!msg.content.includes("-s")) {
              targetID.sendMessage(`Your voice-ban on the ${msg.guild.name} has been lifted. You can connect to voice channels again.`);
            }

            try {
                const serverLog = new Discord.RichEmbed()
                    .setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL)
                    .setColor("#ff7200")
                    .setDescription(`**Member:** ${target.username}#${target.discriminator} (${target.id})\n**Action:** Voice-unban`)
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
    aliases: ["vunban", "vub", "vcunban"],
    permLevel: 2,
    botPerms: ["MANAGE_ROLES_OR_PERMISSIONS"],
    requiredFuncs: []
};

exports.help = {
    name: "vcunban",
    description: "Unbans user from server's voice channels",
    usage: "<user:user>",
    usageDelim: ""
};
