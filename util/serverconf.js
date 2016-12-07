var r = require('rethinkdbdash')({servers: [{db: ""}]});

var serverconf = new Map();

exports.init = (bot, callback) => {
  if(serverconf.size > 0) return serverconf;
  const promises = [];
  bot.servers.map( server => {
    promises.push(
      r.table("servers").get(server.id).run().then( (resp) => { serverconf.set(server.id, resp); })
      .catch( e => { this.add(server).then( conf => serverconf.set(server.id, conf));})
    );
  });
  Promise.all(promises).then(()=>{ callback(serverconf);}).catch(console.error);
};

exports.add = (server, callback) => {
  return new Promise( (resolve, reject) => {
    if(serverconf.has(server.id)) reject();
    else {
      var query = {
        id: server.id,
        name: server.name,
        private_welcome: false,
        prefix: "-", lang: "en",
        stats: false,
        welcome_count: false,
        admin_role: null,
        mod_role: null,
        streaming_role: false
      };
      r.table("servers").insert(query).run().then( (resp) => {
        serverconf.set(server.id, query);
        resolve(resp);
      });
    }
  });
};

exports.has = (serverid) => {
  return serverconf.has(serverid);
};

exports.get = (serverid) => {
  if(serverconf.has(serverid)) return serverconf.get(serverid);
  else return null;
};

exports.set = (serverid, key, value, callback) => {
  return new Promise( (resolve, reject) => {
    if(!serverconf.has(serverid)) {
     reject(`Server ${serverid} not found while trying to set the ${key} conf value to ${value}`);
     return;
    }
    var thisconf = serverconf.get(serverid);
    if(!(key in thisconf)) {
     reject(`The key ${key} was not found in the configuration for the server ${serverid}.`);
     return;
    }

    // custom value checks
    value = key === "welcome_count" ? parseInt(value, 10) : value;
    value = key === "private_welcome" ? JSON.parse(value) : value;
    value = key === "stats" ? JSON.parse(value) : value;

    thisconf[key] = value;
    serverconf.set(serverid, thisconf);
    var query = {};
    query[key] = value;
    r.table("servers").get(serverid).update(query).run().then( (resp) => {
      resolve(resp);
    }).catch(reject);
  });
};
