exports.run = (client, msg) => {
  msg.reply(`flips a coin. It lands on ${Math.random() > 0.5 ? '**heads**' : '**tails**'}.`);
};

exports.conf = {
  enabled: true,
  selfbot: false,
  guildOnly: false,
  aliases: ['coin'],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: 'coinflip',
  description: 'Flips a (pseudo) fair coin.',
  usage: '',
  usageDelim: '',
};
