exports.run = async (client, msg, [type, name]) => {
  switch (type) {
    case "inhibitor": {
      const inhibitor = client.commandInhibitors.get(name);
      if (!inhibitor) return msg.sendCode("diff", `- Inhibitor not found: ${name}.`);
      inhibitor.conf.enabled = false;
      return msg.sendCode("diff", `+ Successfully disabled the ${name} inhibitor.`);
    }
    case "monitor": {
      const monitor = client.messageMonitors.get(name);
      if (!monitor) return msg.sendCode("diff", `- Monitor not found: ${name}.`);
      monitor.conf.enabled = false;
      return msg.sendCode("diff", `+ Successfully disabled the ${name} monitor.`);
    }
    case "command": {
      const command = client.commands.get(name) || client.commands.get(client.aliases.has(name));
      if (!command) return msg.sendCode("diff", `- Command not found: ${name}.`);
      command.conf.enabled = false;
      return msg.sendCode("diff", `+ Successfully disabled the ${name} command.`);
    }
    default:
      return msg.sendMessage("This will never happen.");
  }
};

exports.conf = {
  enabled: true,
  runIn: ["text", "dm", "group"],
  aliases: [],
  permLevel: 10,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "disable",
  description: "Temporarily disables an inhibitor/monitor/command. Resets upon reboot.",
  usage: "<inhibitor|monitor|command> <name:str>",
  usageDelim: " ",
};
