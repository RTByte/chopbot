const komada = require('komada');

const client = komada.start({
    "botToken": "",
    "ownerid": ["106061111605878784", "171366637969211392", "109004714934300672"],
    "clientID": "",
    "prefix": "-",
    "clientOptions": {
        "fetchAllMembers": true
    }
});

const {
    DMManager
} = require('yamdbf-addon-dm-manager');
// ...

client.once('ready', () => {
	client.devLogging = true;
	client.dmManager = new DMManager(client, '271111564826902528');
	client.user.setGame("MOO -help");
    client.user.setStatus("online");
});
