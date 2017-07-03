/**
  * Checks Voice State or rejects it, depending on the response.
  * @function checkVoiceState
  * @param {Object} music - The Music object, created by Initializing
  * @returns {String} message - Will return one of the following: 'autoplay', 'playing', 'paused', 'awaiting'.
  */

module.exports = music => new Promise((resolve, reject) => {
  if (music.autoplay === true) resolve("autoplay");
  if (music.playing === true) resolve("playing");
  if (music.paused === true) resolve("paused");
  if (music.playing === false) resolve("awaiting");
  else reject();
});
