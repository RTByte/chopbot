const komada = require('komada');

const client = komada.start({
  "botToken": "",
  "ownerid" : "106061111605878784",
  "clientID": "270329625626935297",
  "prefix": "-",
  "clientOptions": {
    "fetchAllMembers": true
  }
});

const { DMManager } = require('yamdbf-addon-dm-manager');
// ...
client.once('ready', () => {
    client.dmManager = new DMManager(client, '271111564826902528');
});

/*
try {
  client.channels.get(`${msg.guildConf.logChannel}`).sendMessage('', {
    embed: {
      author: {
        name: `${msg.member.name}#${msg.member.discriminator} (${msg.member.id})`,
        icon_url: msg.member.iconURL
      },
      color: 6094625,
      timestamp: new Date(),
      footer: {
        text: "User joined"
      }
    }
  });
} catch (err) {
  return;
}
*/
