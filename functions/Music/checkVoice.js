module.exports = msg => new Promise((resolve, reject) => {
  if (!msg.guild.voiceConnection) reject("There's no voice connection on your server.");
  if (msg.guild.voiceConnection.channel.id !== msg.member.voiceChannelID) reject("You're not in the same voice channel as me.");
  resolve(msg.guild.voiceConnection.music);
});
