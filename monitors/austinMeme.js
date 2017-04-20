let victim = '246164674633007105';
let ahdGuild = '258447100193275904';

exports.conf = {
    enabled: true,
    spamProtection: false,
}

exports.run = (client, msg, guild) => {
    return new Promise((resolve) => {
        if (msg.guild.id === ahdGuild){
            if (msg.author.id === victim){
                if((msg.mentions.users.first())||(msg.mentions.roles.first())||(msg.mentions.channels.first())||(msg.mentions.everyone)){
                    msg.channel.sendMessage(`<@${victim}> Stop Pinging.`)
                    .then(newMsg => {
                        setTimeout(() => {
                            newMsg.delete();
                        }, 1000);
                    })
                    .catch(console.error);
                }
            }
        }
        resolve();
    });
};