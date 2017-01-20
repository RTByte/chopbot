exports.run = (client, msg) => {
  msg.channel.sendMessage("Ping?")
    .then((message) => {
      message.edit(`PONG! \`${message.createdTimestamp - msg.createdTimestamp} ms\``);
  });

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
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "ping",
  description: 'Pings the bot, returns with "PONG!" and the response time in milliseconds.',
  usage: "",
  usageDelim: "",
};
