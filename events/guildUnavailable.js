exports.run = async (client, guild) => {
  try {
      const guildUnavailable = new client.methods.Embed()
          .setAuthor(`${guild.name} (${guild.id})`, guild.iconURL())
          .setColor("#ffe84e")
          .setTimestamp()
          .setFooter("Guild unavailable due to server outage");

      const logChannel = await client.channels.get(client.devLogChannel);

      await logChannel.send('', { disableEveryone: true, embed: guildUnavailable });
  } catch (err) {
      await client.emit("log", err, "error");
};
