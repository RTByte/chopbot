const Discord = require('discord.js');

exports.run = (client, msg, [cmd]) => {
  const owners = ["106061111605878784", "78980677566988288", "148151673141985280", "164086294048145408", "94911514401570816", "96652777131880448", "158261512723628032", "167123025135796224", "145967922253135872", "95598079960416256", "173867770570604544"];

  if(owners.indexOf(`${msg.author.id}`) > -1) {
    if (!cmd) {
      const helpMessage = new Discord.RichEmbed()
        .setAuthor("Owner Commands", client.user.avatarURL)
        .setColor("#ffffff")
        .addField("-conf <set|get|reset|list> [key] [value]", "Define per-server configuration.\nAliases: *'config'*");
      msg.author.sendEmbed(helpMessage, '', { disableEveryone: true });
      msg.reply("Sent you a DM with information.")
    } else if (client.commands.has(cmd)) {
      cmd = client.commands.get(cmd);
      const helpMessageCMD = new Discord.RichEmbed()
        .setAuthor(`${cmd.help.name}`, client.user.avatarURL)
        .setColor("#ffffff")
        .setTitle(`${cmd.help.description}`)
        .setDescription(`\`${client.funcs.fullUsage(client, cmd)}\``);
      msg.author.sendEmbed(helpMessageCMD, '', { disableEveryone: true });
      msg.reply("Sent you a DM with information.")
    }
  } else {
    msg.reply("You need to be the owner of an RT Family Discord to view this help command.")
  }

  // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
  const devLogger = new Discord.RichEmbed()
    .setAuthor(`${msg.guild.name}`, msg.guild.iconURL)
    .setColor("#ffffff")
    .addField("Command Content", `${msg.content}`, true)
    .setTimestamp()
    .setFooter(`${msg.author.username}#${msg.author.discriminator}`, msg.author.avatarURL);

  client.channels.get('271869758024974336').sendEmbed(devLogger, '', { disableEveryone: true });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "ownerhelp",
  description: "Displays help for owner commands.",
  usage: "[command:str]",
  usageDelim: "",
};
