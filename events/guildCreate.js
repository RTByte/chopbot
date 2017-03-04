exports.run = (client, guild) => {
    let mutedRole = guild.roles.find("name", "Muted");
    if (!mutedRole) {
        guild.createRole({
                name: 'Muted',
                hoist: false,
                poistion: 0,
                permissions: ["READ_MESSAGES", "READ_MESSAGE_HISTORY", "CONNECT"],
                mentionable: false
            })
            .then(role => console.log(`Created role ${role} on ${guild}.`)
                .catch(console.error));
            }
        else {
            guild.roles.find("name", "Muted")
                .edit({
                    hoist: false,
                    poistion: 0,
                    permissions: ["READ_MESSAGES", "READ_MESSAGE_HISTORY", "CONNECT"],
                    mentionable: false
                })
                .then(r => console.log(`Edited role ${r}`))
                .catch(console.error);
    }
    let voiceBanRole = guild.roles.find("name", "Voice Chat Banned");
    if (!voiceBanRole) {
        guild.createRole({
                name: 'Voice Chat Banned',
                hoist: false,
                poistion: 0,
                permissions: [],
                mentionable: false
            })
            .then(role => console.log(`Created role ${role} on ${guild}.`)
                .catch(console.error));
            }
        else {
            guild.roles.find("name", "Voice Chat Banned")
                .edit({
                    hoist: false,
                    poistion: 0,
                    permissions: [],
                    mentionable: false
                })
                .then(r => console.log(`Edited role ${r}`))
                .catch(console.error);
    }
}
