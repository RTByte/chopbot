exports.conf = {
  type: "get",
  method: "levelInfo",
  appliesTo: ["GuildMember"],
};

exports.extend = function () {
	return(this.client.funcs.serverxp.levelInfo(this.client, this));
};
