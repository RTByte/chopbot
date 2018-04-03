exports.run = async (client, channel) => {
  if (!channel.guild) return;
  const channelCreate = new client.methods.Embed()
      .setAuthor(`#${channel.name}`, channel.guild.iconURL())
      .setColor("#ffffff")
      .setTimestamp()
      .setFooter(`Channel created`);

  const logChannel = await client.channels.get(channel.guild.settings.logChannel);
  await logChannel.send('', { disableEveryone: true, embed: channelCreate });
};
