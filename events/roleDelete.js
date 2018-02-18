exports.run = async (client, role) => {
  const roleDelete = new client.methods.Embed()
      .setAuthor(`@${role.name}`, role.guild.iconURL())
      .setColor("#ffffff")
      .setTimestamp()
      .setFooter(`Role deleted`);

  const logChannel = await client.channels.get(role.guild.settings.logChannel);
  await logChannel.send('', { disableEveryone: true, embed: roleDelete });
};
