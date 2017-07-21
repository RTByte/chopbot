const { inspect } = require("util");

exports.run = async (client, msg, [action, key, ...value]) => {
  const configs = msg.guild.settings;

  switch (action) {
    case "set": {
      if (!key) return msg.sendMessage("Please specify which key you would like to edit.");
      if (!value[0]) return msg.sendMessage("You must provide a value.");
      if (!configs.id) await client.settingGateway.create(msg.guild);
      if (client.settingGateway.schemaManager.schema[key].array) {
        await client.settingGateway.updateArray(msg.guild, "add", key, value.join(" "));
        return msg.sendMessage(`Successfully added the value \`${value.join(" ")}\` to the **${key}** key.`);
      }
      const response = await client.settingGateway.update(msg.guild, key, value.join(" "));
      return msg.sendMessage(`Successfully updated the **${key}** key: \`${response}\``);
    }
    case "remove": {
      if (!key) return msg.sendMessage("Please specify which key you would like to remove.");
      if (!value[0]) return msg.sendMessage("You must provide a value.");
      if (!configs.id) await client.settingGateway.create(msg.guild);
      if (!client.settingGateway.schemaManager.schema[key].array) return msg.sendMessage("This key is not an array, use the 'reset' action instead.");
      return client.settingGateway.updateArray(msg.guild, "remove", key, value.join(" "))
        .then(() => msg.sendMessage(`Successfully removed the value \`${value.join(" ")}\` from the **${key}** key.`))
        .catch(e => msg.sendMessage(e));
    }
    case "get": {
      if (!key) return msg.sendMessage("Please specify which key you would like to fetch.");
      if (!(key in configs)) return msg.sendMessage(`The **${key}** key does not seem to exist.`);
      return msg.sendMessage(`The value for the **${key}** key is: \`${inspect(configs[key])}\``);
    }
    case "reset": {
      if (!key) return msg.sendMessage("Please specify which key you would like to reset.");
      if (!configs.id) await client.settingGateway.create(msg.guild);
      const response = await client.settingGateway.reset(msg.guild, key);
      return msg.sendMessage(`The **${key}** key has been reset to: \`${response}\``);
    }
    case "list": return msg.sendCode("js", inspect(configs));
    // no default
  }

  return null;
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 3,
  botPerms: [],
  requiredFuncs: [],
  requiredSettings: [],
};

exports.help = {
  name: "conf",
  description: "Defines per-server configuration.",
  usage: "<set|get|reset|list|remove> [key:string] [value:string]",
  usageDelim: " ",
};
