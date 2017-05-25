exports.run = (client, guildMember) => {
    const Discord = require('discord.js');

	const guildConf = client.funcs.confs.get(guildMember.guild);

    client.funcs.userCache.userExists(guildMember.user)
    .then((userExists) => {
        if(userExists){
            client.funcs.userCache.serverExists(guildMember)
            .then((serverExists) => {
                if(serverExists){
                    //User is re-joining this server
                    userJoined(client, guildMember, Discord, guildConf, false);
                } else {
                    //User is joining this server for the first time
                    client.funcs.userCache.newServer(guildMember)
                    .then((err) => {
                        userJoined(client, guildMember, Discord, guildConf, true);
                    });
                }
            });
        } else {
            //User is new to both ChopBot and this server
            client.funcs.userCache.newUser(guildMember)
            .then((err) => {
                client.funcs.userCache.newServer(guildMember)
                .then((err) => {
                    userJoined(client, guildMember, Discord, guildConf, true);
                });
            });
        }
    });

};

function userJoined(client, guildMember, Discord, guildConf, firstTime = true){
    try {
        const newUser = new Discord.RichEmbed()
            .setAuthor(`${guildMember.user.username}#${guildMember.user.discriminator} (${guildMember.user.id})`, guildMember.user.avatarURL)
            .setColor("#00ff00")
            .setTimestamp()
            .setFooter(`User joined`);
        
        if(!firstTime){
            newUser.setFooter(`User re-joined`);
        }

        client.channels.get(`${guildConf.logChannel}`).sendEmbed(newUser, '', {
            disableEveryone: true
        });
    } catch (err) {
        return;
    }
}