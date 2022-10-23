let message = {
	created:null,
	last_updated:"",
	type:"",
	message:null,
	lock:false,
	users:0
};
exports.newNote = () =>{
	let now = new Date(Date.now()).toISOString();
	message.created = now;
	message.last_updated = now;
	message.type = "NEW";
	message.users =  1;
	console.log(message);
	return JSON.stringify(message);
}
exports.getNote = (create,last_updated,users,mesg,lock) =>{
	message.created =  create;
	message.last_updated =  last_updated||null;
	message.type = "UPDATE";
	message.users = users;
	message.message = mesg;
	message.lock = lock||false;
	console.log(message);
	return JSON.stringify(message);
}
exports.sendNote = (create,last_updated,users,mesg,lock) =>{
	message.created =  create;
	message.last_updated =  last_updated||null;
	message.type = "UPDATE";
	message.users = users;
	message.message = mesg;
	message.lock = lock||false;
	console.log(message);
	return JSON.stringify(message);
}