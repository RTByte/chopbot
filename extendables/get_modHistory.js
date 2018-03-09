exports.conf = {
  type: "get",
  method: "modHistory",
  appliesTo: ["User"],
};

exports.extend = function () {
	return(this.client.funcs.modhistory.getHistory(this.client, this));
};
