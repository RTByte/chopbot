exports.run = async (client, msg, [...args]) => {
    const discography = require("./discography.json");

    let song = discography.songs[Math.floor(Math.random() * discography.songs.length)];
    let lyric = song.lyrics[Math.floor(Math.random() * song.lyrics.length)];

    const kendrickEmbed = new client.methods.Embed()
        .setAuthor(`Kendrick Lamar - ${song.title}`)
        .setDescription(`${lyric}`)
        .setFooter(`${song.album} - ${song.year}`);

    return msg.channel.send("", { embed: kendrickEmbed });
};

exports.conf = {
    enabled: true,
    runIn: ["text", "group", "dm"],
    aliases: [],
    permLevel: 2,
    botPerms: [],
    requiredFuncs: []
};

exports.help = {
    name: "kendrick",
    description: "kendrick",
    usage: "",
    usageDelim: ""
};
