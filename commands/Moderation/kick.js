exports.run = (client, msg, [user]) => {
  msg.guild.member(user).kick()
  .then(() => msg.channel.sendMessage(`**${user.username}#${user.discriminator}** was kicked.`))
  .catch(e => msg.reply(`There was an error trying to kick: ${e}`));

  // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
  client.channels.get('271869758024974336').send('', {
    embed: {
      author: {
        name: `${msg.guild.name}`,
        icon_url: msg.guild.iconURL
      },
      color: 16645629,
      title: "Command ran:",
      description: `${msg.content}`,
      timestamp: new Date(),
      footer: {
        text: `${msg.author.username}#${msg.author.discriminator}`,
        icon_url: msg.author.avatarURL
      }
    }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["k"],
  permLevel: 2,
  botPerms: ["KICK_MEMBERS"],
  requiredFuncs: [],
};

exports.help = {
  name: "kick",
  description: "Kicks mentioned user. Currently does not require reason (no mod-log)",
  usage: "<user:user> <reason:str>",
  usageDelim: " ",
};
