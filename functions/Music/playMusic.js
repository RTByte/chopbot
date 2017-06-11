const yt = require("ytdl-core");

/**
  * Plays Music - You will never need to call this unless you're making a command to play music
  * @function playMusic
  * @param {Object} client - The Discord.js client
  * @param {Object} music - The Music object, created by Initializing
  * @returns {String} message - "Now Playing | X Song | Requested By: Y"
  */

module.exports = (client, music) => {
  music.channel.messages.get(music.queue[0].id).delete();
  music.playing = true;
  music.dispatcher = music.connection.playStream(yt(music.queue[0].url, { audioonly: true }));
  music.dispatcher.setVolumeLogarithmic(music.volume / 100);
  const embed = {
    title: `Now Playing Information - ${music.queue[0].url}`,
    color: 16711680,
    video: {
      url: music.queue[0].url,
      height: 200,
      width: 200,
    },
    fields: [
      {
        name: "Title",
        inline: true,
        value: music.queue[0].title,
      },
      {
        name: `${String.fromCharCode(20)}`,
        inline: true,
        value: `${String.fromCharCode(20)}`
      },
      {
        name: "Requester",
        inline: true,
        value: music.queue[0].requester,
      },
      {
        name: "Likes",
        inline: true,
        value: music.queue[0].stats.likeCount,
      },
      {
        name: "Views",
        inline: true,
        value: music.queue[0].stats.viewCount,
      },
    ],
  };
  music.channel.sendMessage(" ", { embed: embed }).then((m) => {
    music.dispatcher.on("error", (error) => {
      music.channel.sendMessage(error);
    });
    music.dispatcher.once("end", () => {
      music.skips = [];
      m.delete();
      client.funcs.checkQueue(client, music);
    });
  });
};
