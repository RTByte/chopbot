exports.init = (client) => {
  if (client.ytKey === (undefined || null)) {
    client.emit("log", "You did not configure a youtube developer key. You will not be able to use music commands.", "warn");
  }
};

exports.statistics = (client, id) => {
  const request = require("request");
  return new Promise((resolve, reject) => {
    request({ url: `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${id}&key=${client.ytKey}`, json: true }, function(error, response, body) {
        if (body.error) {
          resolve(body.error.message);
        } else if (!body.error) {
          resolve(body);
        }
    });
  });
};
