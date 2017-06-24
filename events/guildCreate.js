exports.run = (client, guild) => {
    let mutedRole = guild.roles.find("name", "Muted");
    if (!mutedRole) {
        guild.createRole({
                name: 'Muted',
                hoist: false,
                poistion: 0,
                permissions: [],
                mentionable: false
            })
            .then(role => console.log(`Created role ${role} on ${guild}.`)
                .catch((err) => {
                    if(err){
                        client.emit("log", err, "error");
                    }
                }));
            }
        else {
            guild.roles.find("name", "Muted")
                .edit({
                    hoist: false,
                    poistion: 0,
                    permissions: [],
                    mentionable: false
                })
                .then(r => console.log(`Edited role ${r}`))
                .catch((err) => {
                    if(err){
                        client.emit("log", err, "error");
                    }
                });
    }
    let voiceBanRole = guild.roles.find("name", "Voice Chat Banned");
    if (!voiceBanRole) {
        guild.createRole({
                name: 'VC Banned',
                hoist: false,
                poistion: 0,
                permissions: [],
                mentionable: false
            })
            .then(role => console.log(`Created role ${role} on ${guild}.`)
                .catch((err) => {
                    if(err){
                        client.emit("log", err, "error");
                    }
                }));
            }
        else {
            guild.roles.find("name", "VC Banned")
                .edit({
                    hoist: false,
                    poistion: 0,
                    permissions: [],
                    mentionable: false
                })
                .then(r => console.log(`Edited role ${r}`))
                .catch((err) => {
                    if(err){
                        client.emit("log", err, "error");
                    }
                });
    }
}
