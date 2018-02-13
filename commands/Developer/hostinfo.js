exports.run = async (client, msg) => {
    const os = require('os');
    const moment = require("moment");
    require("moment-duration-format");

    const hostinfoEmbed = new client.methods.Embed()
      .setAuthor("ChopBot Host Info", "https://i.imgur.com/RDW1r3T.png")
      .setColor("#ffffff")
      .addField("Hostname", os.hostname(), true)
      .addField("Running on", os.type(), true)
      .addField("CPU Architecture", os.arch(), true)
      .addField("Uptime", os.uptime(), true)
      .addField("Load Average", os.loadavg(), true)

      .setThumbnail("http://i.imgur.com/7lSighC.png", 50, 50)
      .setTimestamp()
      .setFooter(`Requested by ${msg.author.tag}`, msg.author.avatarURL());
    return msg.channel.send('', { disableEveryone: true, embed: hostinfoEmbed });
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["hinfo"],
    permLevel: 10,
    botPerms: [],
    requiredFuncs: [],
};

exports.help = {
    name: "hostinfo",
    description: "Shows info about bot host.",
    usage: "",
    usageDelim: "",
    type: "debug",
};
