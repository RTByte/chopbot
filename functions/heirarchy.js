exports.check = function(executor, target, guild = null) {
    return new Promise((resolve, reject) => {
        if (guild) {
            guild.fetchMember(executor)
            .then(executorGM => {
                guild.fetchMember(target)
                .then(targetGM => {
                    
                    if(executorGM.highestRole.position > targetGM.highestRole.position){
                        resolve(true);
                    } else {
                        resolve(false);
                    }

                    })
                .catch(client.emit("log", err, "error"));
            })
            .catch(client.emit("log", err, "error"));

        } else {
            resolve(false);
        }
    });


};