exports.run = (client, msg, [type, status, ...game]) => {
  game = game.join(" ");
  if (type === "status") {
    if (!status) status = "online";
    client.user.setStatus(status).then(() => {
      msg.channel.sendMessage(`Status changed to ***${status}***`);
    }).catch(error => console.log(error.stack));
  } else if (type === "game") {
    if (!game) game = null;
    client.user.setGame(game).then(() => {
      msg.channel.sendMessage(`${game ? `Game changed to ***${game}***` : "Game cleared"}`);
    });
  }

  // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
  client.channels.get('271869758024974336').send('', {
    embed: {
      author: {
        name: `${msg.guild.name}`,
        icon_url: msg.guild.iconURL
      },
      color: 16645629,
      fields: [{
          name: "Command Content",
          value: `\`${msg.content}\``,
          inline: true
        }
      ],
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
  selfbot: false,
  guildOnly: false,
  aliases: [],
  permLevel: 3,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "presence",
  description: "Set either your 'status' or your 'game' by using this command",
  usage: "<status|game> [online|idle|invisible|dnd] [game:str]",
  usageDelim: " ",
};
