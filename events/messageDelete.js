exports.run = (client, msg) => {
  client.channels.get(`${msg.guildConf.logChannel}`).send('', {
    embed: {
      author: {
        name: `#${msg.channel.name}`,
        icon_url: msg.guild.iconURL
      },
      color: 4359924,
      fields: [{
          name: "Message Deleted",
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
