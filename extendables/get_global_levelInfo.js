exports.conf = {
  type: "get",
  method: "levelInfo",
  appliesTo: ["User"],
};

exports.extend = function () {
	return(this.client.funcs.globalxp.getCache(this.client, this));
};
