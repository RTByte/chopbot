exports.run = (client, msg) => {
  msg.reply(`${Math.random() > 0.5 ? '🙂 heads' : '🙃 tails'}.`);
};

exports.conf = {
  enabled: true,
  selfbot: false,
  guildOnly: false,
  aliases: ['coin', "flip"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: 'coinflip',
  description: 'Flips a (pseudo) coin. 🙂 for heads, 🙃 for tails.',
  usage: '',
  usageDelim: '',
};
