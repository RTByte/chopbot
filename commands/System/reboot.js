exports.run = (client, msg) => {

  // COMMAND LOGGER, LOGS TO #bot-log in ChopBot Dev
  client.channels.get('271869758024974336').sendMessage('', {
    embed: {
      author: {
        name: `${msg.guild.name}`,
        icon_url: msg.guild.iconURL
      },
      color: 16645629,
      fields: [{
          name: "Command Content",
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

  const collector = msg.channel.createCollector(m => m.author === msg.author, {
    time: 10000,
  });
  msg.channel.sendMessage("are you sure?");
  collector.on("message", (m) => {
    if (m.content === "no") collector.stop("aborted");
    if (m.content === "yes") collector.stop("success");
  });
  collector.on("end", (collected, reason) => {
    if (reason === "time") return msg.channel.sendMessage("The prompt timed out...");
    if (reason === "aborted") return msg.channel.sendMessage("The reboot has been aborted");
    if (reason === "success") {
      msg.channel.sendMessage("Rebooting...")
        .then(() => {
          process.exit();
        })
        .catch((e) => {
          console.error(e);
        });
    }
    return true;
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "reboot",
  description: "Reboots the bot.",
  usage: "",
  usageDelim: "",
};
