const Discord = require('discord.js');

exports.run = (client, msg, [user, ...args]) => {
    const target = msg.mentions.users.first();
    const targetID = msg.guild.members.get(target.id);

    if(!targetID.voiceChannel){
        msg.channel.sendMessage(`\`\`\`${target.username} is not in a voice channel.\`\`\``);
    } else {
        var originChannel = targetID.voiceChannel;
        try{
            msg.guild.createChannel(`kick${target.username}`, `voice`)
                .then(kickChannel => {
                    targetID.setVoiceChannel(kickChannel);
                    setTimeout(() => {
                        kickChannel.delete();
                    }, 250);
                    msg.channel.sendMessage(`\`\`\`${target.username} kicked from ${originChannel.name} voice chat.\`\`\``);
                });
        } catch (e) {
            msg.channel.sendMessage(`\`\`\`I couldn't kick ${target.username} from ${originChannel.name} voice chat.\`\`\``);
        }
        //targetID.sendMessage(`You have been kicked from ${originChannel.name} voice chat.\n**Reason:** ${args.toString().split(",").join(" ")}.\n\nThis action was performed manually by a moderator of the ${msg.guild.name} Discord. If you are confused, or need help, feel free to respond to this message and someone will get back to you soon.`);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["vkick", "voicekick"],
    permLevel: 2,
    botPerms: ["MANAGE_CHANNELS", "MOVE_MEMBERS"],
    requiredFuncs: [],
};

exports.help = {
    name: "VoiceKick",
    description: "Kicks user out of voice channel.",
    usage: "<user:user> <reason:str> [...]",
    usageDelim: " ",
};
