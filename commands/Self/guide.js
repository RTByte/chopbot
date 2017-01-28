const Discord = require('discord.js');

exports.run = (client, msg) => {
  const guideEmbed = new Discord.RichEmbed()
    .setAuthor("ChopBot Mod Setup Guide", client.user.avatarURL)
    .setColor("#ffffff")
    .setDescription("In order to set up ChopBot for your RT Family Discord server, there are some commands you'll need to run. Sections marked with \`⚠️\`️ are *required*, and need to be set up in order for the bot to work correctly on your server. This will also describe each configuration option available to you.")
    .addField("Mod & Admin Roles ⚠️", "You will need to specify two roles for the bot to look for in regards to permissions. I'd recommend setting your mod role to a role all server staff has. This role can be called whatever you want. This needs to be specified in *plain text*, meaning no @mention or ID of the role.\n\`-conf set modRole <role>\`\n\`-conf set adminRole <role>\`")
    .addField("Mod Chat ⚠️", "You will need to specify which channel is your mod chat. The bot will post user reports in here (More to come in the future). You can either get the ID of the channel directly or #channel mention it.\n\`-conf set modChat <ID/#channel>\`")
    .addField("Logs Channel ⚠️", "You will need to specify a channel to log message deletes, blacklist deletes and more in. You can either get the ID of the channel directly, or #channel mention it. It can be called whatever you want.\n\`-conf set logChannel <ID/#channel>\`")
    .addField("Whitelisted Role", "If you'd like, you can specify a role that doesn't get filtered by the word blacklist. This can be useful for discussions in mod chat regarding certain users of your community. I'd recommend setting this to your mod role. This option needs to be set via a role ID or @role mention.\n\`-conf set whitelistedRole <ID/@role>\`")
    .addField("Prefix", 'If you want to, you can change the command prefix from the default \`-\` to something else. Please do note that if you do this, the actual prefix might vary from the bot\'s "Playing" status.\n\`-conf set prefix <prefix>\`')
    .addField("Disabled Commands", "If you feel like there is a need to, you can disable any and all commands available to you. *DO NOT* disable the -conf command or you will need to get a dev to reset it for you.\n\`-conf set disabledCommands <command>\`")
    .addField("\u200b", "\u200b")
    .setFooter("When the bot joins the server, it will create a new role, called \"Muted\". You will need to remove this role's ability to speak in each text- and voice channel, to make sure that once someone is muted, they are *actually* muted.")
  msg.channel.sendEmbed(guideEmbed, '', { disableEveryone: true });

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
  guildOnly: true,
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "guide",
  description: 'A guide on how to set the bot up.',
  usage: "",
  usageDelim: "",
};
