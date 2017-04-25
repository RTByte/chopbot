exports.run = (client, msg) => {
    const Discord = require('discord.js');

    // Dev Mention Function
    if (!(msg.channel.id === 255839946093494273)) {
      if (msg.content.toLowerCase().includes("rasmus") || msg.content.toLowerCase().includes("killian") || msg.content.toLowerCase().includes("stickman")) {
        client.funcs.devLog.devLog(client, msg, false);
      }
    }
};
