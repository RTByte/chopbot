exports.run = (client, msg) => {
    const Discord = require('discord.js');
    
    //Here there be dragons...

    if(msg.guild){
	    //Checking to see if this user exists
	    client.funcs.userCache.userExists(msg.author)
	    .then((userExists) => {
	    	msg.guild.fetchMember(msg.author).then((guildMember) => {
	    		if(userExists){
	    			//Checking to see if user has this server tracked
	    			client.funcs.userCache.serverExists(guildMember)
	    			.then((serverTracked) => {
	    				if(serverTracked){
	    					//Performing usual duties
	    					addXP(client, msg, guildMember);
	    				} else {
	    					//Registering this server for the user
	    					client.funcs.userCache.newServer(guildMember)
	    					.then((err) => {
								addXP(client, msg, guildMember);
	    					});
	    				}
	    			});
		
	    		} else {
	    			//Registering this user
	    			client.funcs.userCache.newUser(guildMember)
	    			.then((err) => {
	    				//Registering this server for the user
	    				client.funcs.userCache.newServer(guildMember)
	    				.then((err) => {
	    					//Performing usual duties
	    					addXP(client, msg, guildMember);
	    				});
	    			});
	    		}
	    	});


	    });
    }

};

function addXP(client, msg, guildMember){
	//Performing usual duties
	client.funcs.userCache.addXP(guildMember, msg)
	.then((earnedXP) => {
		client.funcs.userCache.updateLevel(guildMember, msg)
		.then((levelUp) => {
			if(levelUp){
			 //Notify of Level Up? TODO
			}
			    					
			client.funcs.userCache.addMessage(guildMember, msg)
			.then((globalMessageCount) => {});
		});
	});
}