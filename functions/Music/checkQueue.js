module.exports = (client, music) => {
  if (music === undefined) return;
  music.queue.shift();
  if (music.queue[0] === undefined) {
    music.playing = false;
    music.channel.sendMessage(":musical_note: Aww.. I've run out of songs to play. Queue up some more!");
    return;
  }
  client.funcs.checkVoiceState(music).then((response) => {
    if (response === "playing") {
      client.funcs.playMusic(client, music);
    }
  });
};
