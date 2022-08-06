const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const webSocket = require('ws');
const port = 8080;
const wss = new webSocket.Server({server:server});
const build = path.join(__dirname,"svelte/public");
let clients = [];
let con = null;
let curUser= null;
app.use(express.static(build));
app.get('/', (req, res) => {
  res.send("index.html");
});
app.get('/:id',(req,res,next) => {
	res.sendFile(__dirname+"/svelte/public/index.html");
	curUser= req.params.id;
});
wss.on("connection",(ws)=>{
	console.log("new connection");
	//ws.on("open",()=>{
        ws.id=uuidv4();
	ws.urlid=curUser;
	clients.push(ws);
        console.log("number of connected users: "+clients.length);
        //});
	ws.on("close",()=>{
		console.log(ws.id+" left");
		cliIndex = clients.findIndex(i=>i.id===ws.id);
		console.log("deleted user: "+cliIndex);
		if(cliIndex>-1)
			clients.splice(cliIndex,1);
	});
	ws.on("message",(m)=>{
		console.log("%s from client %s to",m,ws.id)
		emit(ws,JSON.stringify(m));
	});
});
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
function emit(emitter,mesg){
	for(let i = 0;i<clients.length;i++){
		if(emitter.id != clients[i].id&&emitter.urlid==clients[i].urlid){
			clients[i].send(mesg);
			console.log("emmited to client "+i);
		}
	}
}
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
