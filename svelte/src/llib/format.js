let message = {
	created:null,
	last_updated:"",
	type:"",
	message:null,
	lock:false,
	users:0
};
exports.sendToPeer = (create,last_updated,users,mesg,lock) =>{
	message.created =  create;
	message.last_updated =  last_updated||null;
	message.type = "PEER_UPDATE";
	message.users = users;
	message.message = mesg;
	message.lock = lock||false;
	console.log(message);
	return JSON.stringify(message);
}