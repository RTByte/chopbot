const longTypes = { command: "commands", inhibitor: "commandInhibitors", monitor: "messageMonitors", finalizer: "commandFinalizers" };

exports.run = async (client, msg, [type, name]) => {
  let toEnable = client[longTypes[type]].get(name);
  if (!toEnable && type === "command") toEnable = client.commands.get(client.aliases.get(name));
  if (!toEnable) return msg.send(`<:cbotX:413463891998146560> Cannot find the ${type} ${name}.`);
  toEnable.conf.enabled = true;
  return msg.send(`<:cbotCheckmark:413464351467634689> Successfully enabled the ${type} \`${name}\`.`);
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 10,
  botPerms: ["SEND_MESSAGES"],
  requiredFuncs: [],
  requiredSettings: [],
};

exports.help = {
  name: "enable",
  description: "Re-enables or temporarily enables a command/inhibitor/monitor/finalizer. Default state restored on reboot.",
  usage: "<command|inhibitor|monitor|finalizer> <name:str>",
  usageDelim: " ",
};
