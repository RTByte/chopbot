module.exports = (client, user, guild = null) => new Promise((resolve, reject) => {
    const guildConf = client.funcs.confs.get(guild);
    let permlvl = 0;
    if (guild) {
        try {
            const member = guild.member(user);
            const eventRole = guild.roles.find("name", guildConf.eventRole);
            const modRole = guild.roles.find("name", guildConf.modRole);
            const adminRole = guild.roles.find("name", guildConf.adminRole);

            if (eventRole && member.roles.has(eventRole.id)) {
                permlvl = 1;
            }
            if (modRole && member.roles.has(modRole.id)) {
                permlvl = 2;
            }
            if (adminRole && member.roles.has(adminRole.id)) {
                permlvl = 3;
            }
            if (member === guild.owner) {
                permlvl = 4;
            }
        } catch (e) {
            reject(e);
        }
    }
    if (client.config.ownerid.includes(user.id)) {
        permlvl = 10;
    }
    resolve(permlvl);
});
