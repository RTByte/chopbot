exports.run = async (client, msg) => {    

	//Currently we're not planning on doing anything per-message for DMs, so I just have it stop immediately
	//Also just stopping everything if the message was sent via webhook.
    if (!msg.guild || msg.webhookID) return;

};
