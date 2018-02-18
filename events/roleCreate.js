exports.run = async (client, role) => {
  const roleCreate = new client.methods.Embed()
      .setAuthor(`@${role.name}`, role.guild.iconURL())
      .setColor("#ffffff")
      .setTimestamp()
      .setFooter(`Role created`);

  const logChannel = await client.channels.get(role.guild.settings.logChannel);
  await logChannel.send('', { disableEveryone: true, embed: roleCreate });
};
