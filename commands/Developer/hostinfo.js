exports.run = async (client, msg) => {
    const os = require('os');
    const shortNumber = require('short-number');

    const date = new Date(null);
    date.setSeconds(os.uptime()); // specify value for SECONDS here
    let uptimeResult = date.toISOString().substr(11, 8);

    const hostinfoEmbed = new client.methods.Embed()
      .setAuthor("ChopBot Host Info", client.user.avatarURL())
      .setColor("#ffffff")
      .addField("Hostname", os.hostname(), true)
      .addField("Running on", os.type(), true)
      .addField("CPU Architecture", os.arch(), true)
      .addField("Uptime", uptimeResult, true)
      .addField("Load Average", os.loadavg(), true)
      .addField("Free Memory", `${shortNumber(os.freemem())}/${shortNumber(os.totalmem())}`, true)

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
