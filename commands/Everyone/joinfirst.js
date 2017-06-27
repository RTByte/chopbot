const ccdGuild = '175339890832179200';
const firstRole = '302407219704627200';

exports.run = async (client, msg, guild) => {
    let role = msg.guild.roles.find("name", "RT First")
    let user = msg.author.id
    
    if(msg.guild.id != ccdGuild){
        return msg.reply("Sorry, this feature isn't currently enabled on this server");;
    }

    if (msg.guild.id === ccdGuild) {
      msg.guild.member(user).addRole(role)
          .then(() => msg.channel.sendMessage(`Done!`))
            .then(msg2 => msg2.delete(2000))
          .catch(e => msg.reply(`I encountered an error whilst trying to give you the role: ${e}`));
      msg.delete(2200)
    }

    try {
        const serverLog = new client.methods.Embed()
            .setAuthor(msg.author.tag, msg.author.avatarURL)
            .setColor("#ff0fef")
            .setDescription(`Got RT First role.`)
            .setTimestamp();
        return client.channels.get(msg.guild.settings.logChannel).send('', { disableEveryone: true, embed: serverLog });
    } catch (err) {
        return client.emit("log", err, "error");
    }
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [0x10000000],
    requiredFuncs: []
};

exports.help = {
    name: "joinfirst",
    description: "Join the FIRST role and get access to the #first-lounge.",
    usage: "",
    usageDelim: ""
};
