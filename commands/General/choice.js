exports.run = (client, msg, choices) => {
  const validChoices = choices.filter(x => x);

  if (validChoices.length === 1) {
    msg.channel.sendMessage('🤔 You only gave me one choice.');
  } else {
    msg.reply(`🤔 ${choices[Math.floor(Math.random() * choices.length)]}.`);
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
  aliases: ['choose', 'decide'],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: 'choice',
  description: 'Makes a decision for you given some choices.',
  usage: '<choices:str> [...]',
  usageDelim: ', ',
};
