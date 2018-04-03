exports.run = async (client, channel) => {
  const channelDelete = new client.methods.Embed()
      .setAuthor(`#${channel.name}`, channel.guild.iconURL())
      .setColor("#ffffff")
      .setTimestamp()
      .setFooter(`Channel deleted`);

  const logChannel = await client.channels.get(channel.guild.settings.logChannel);
  await logChannel.send('', { disableEveryone: true, embed: channelDelete });
};
