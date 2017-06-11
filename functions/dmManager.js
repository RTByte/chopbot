const {DMManager} = require("yamdbf-addon-dm-manager");

const botConfig = require("../botConfig.json");

exports.init = (client) => {
    client.dmManager = new DMManager(client, botConfig.dmManagerServer);
}