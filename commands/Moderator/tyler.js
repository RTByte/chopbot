exports.run = async (client, msg, [...args]) => {
    const discography = require("tyler.json");

    let song = discography.songs[Math.floor(Math.random() * discography.songs.length)];
    let lyric = song.lyrics[Math.floor(Math.random() * song.lyrics.length)];

    const tylerEmbed = new client.methods.Embed()
        .setAuthor(`Tyler, The Creator - ${song.title}`)
        .setDescription(`${lyric}`)
        .setFooter(`${song.album} - ${song.year}`);

    return msg.channel.send("", { embed: tylerEmbed });
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
    name: "tyler",
    description: "tyler",
    usage: "",
    usageDelim: ""
};
