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
