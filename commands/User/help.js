exports.run = async (client, msg, [cmd]) => {
  const prefix = msg.guildSettings.prefix || client.config.prefix;

  //If the message includes a specific command, show that instead.
  if (cmd) {
    cmd = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

    //If the command doesn't exist, tell the user so.
    if (!cmd) return msg.send(`${client.denyEmoji} Unknown command, please run \`-help\` for a list of commands.`);
    if (!this.runCommandInhibitors(client, msg, cmd)) return;

    const cmdHelp = new client.methods.Embed()
      .setAuthor(`${prefix}${cmd.help.name}`, client.user.avatarURL())
      .setColor("#ffffff")
      .addField(`Description`, `${cmd.help.description}`)
      .addField(`Usage`, `\`${cmd.usage.fullUsage(msg)}\``)
      .setThumbnail("http://i.imgur.com/7lSighC.png", 50, 50)
      .setFooter(`For a full list of commands, run -help.`)
      .setTimestamp();

    return msg.channel.send('', { disableEveryone: true, embed: cmdHelp });
  }

  const helpLanding = new client.methods.Embed()
    .setAuthor(`ChopBot Help`, client.user.avatarURL())
    .setColor("#ffffff")
    .setTitle(`You can also visit the ChopBot website, for easier navigation.`)
    .setURL(`https://www.chopbot.xyz`)
    .addField(`${client.admEmoji} Admin Commands`, '​', true)
    .addField(`${client.modEmoji} Moderator Commands`, '​', true)
    .addField(`${client.uEmoji} User Commands`, '​', true)
    .setThumbnail("http://i.imgur.com/7lSighC.png", 50, 50)
    .setFooter(`React with the emoji representing the category you'd like to view.`)
    .setTimestamp();

  const admin1 = new client.methods.Embed()
  .setAuthor(`Admin Commands`, client.user.avatarURL())
  .setColor("#ffffff")
  .setURL(`https://www.chopbot.xyz`)
  .addField(`${prefix}guide`, 'A guide on how to set the bot up for usage on your server.', true)
  .addField(`${prefix}conf <set/get/reset/list/remove> [key] [value]`, 'Define per-server configuration via commmand.​', true)
  .setThumbnail("http://i.imgur.com/7lSighC.png", 50, 50)
  .setFooter(`Press the home reaction to go back to the landing page.`)
  .setTimestamp();

  const message = await msg.send('', { disableEveryone: true, embed: helpLanding })
  .then(function(msg) {
    msg.react(client.admEmoji)
    msg.react(client.modEmoji)
    msg.react(client.uEmoji)
    msg.react(client.deleteEmoji)
  }).catch(console.error);
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: ["commands", "helpme", "call911"],
  permLevel: 0,
  botPerms: ["SEND_MESSAGES"],
  requiredFuncs: [],
  requiredSettings: [],
};

exports.help = {
  name: "help",
  description: "Displays a list of commands, or extended help for a specified command.",
  usage: "[command:str]",
  usageDelim: "",
};

exports.runCommandInhibitors = (client, msg, command) => !client.commandInhibitors.some((inhibitor) => {
  if (!inhibitor.conf.spamProtection && inhibitor.conf.enabled) return inhibitor.run(client, msg, command);
  return false;
});
