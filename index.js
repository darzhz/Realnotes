require('dotenv').config();
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const express = require('express');
const path = require('path');
const { Telegraf } = require('telegraf');
const app = express();
const server = require('http').createServer(app);
const webSocket = require('ws');
const port = 8080;
const wss = new webSocket.Server({server:server});
const build = path.join(__dirname,"svelte/public");
const tele =  new Telegraf(process.env.TGID);
let clients = [];
let con = null;
let curUser= null;
app.use(express.static(build));
app.get('/notes/:id',(req,res,next) => {
	if(req.params.id.length>4 &&req.params.id.length<=14){
	res.sendFile(__dirname+"/svelte/public/index.html");
	curUser= req.params.id;
	console.log(clients.length);
	}else{
	res.send("<center><h1>Error:INVALID_NUM_OF_LETTERS<br>PLEASE USE 4 OR MORE LETTERS<br> (LESS THAN OR EQUAL TO 14)<\h1><p>korach ekka effort edukkam ketto<br>•́  ‿ ,•̀<\p><\center>");
	}
	//alertMe(req);
});
app.get('/info', async (req, res) => {
	let c = await count(uri);
	let packet = { 
		"NumD":await count(uri),
		"NumL":clients.length,
		"NumS": await getViewInc(uri)
	}
  	await res.send(JSON.stringify(packet));
})
wss.on("connection",async (ws)=>{
	console.log("new connection");
        ws.id=uuidv4();
	ws.urlid=curUser;
	//if there are no users search database
	if(noConnectedClients(ws.urlid)==0){
		let text;
		let res = await search(ws.urlid);
		console.log(res);
	   if(res){
		text = JSON.stringify(res.data.text);
		ws.send(text);
	   }else{
		insertNew(ws.urlid,'');
		console.log('database insertion');
		}
	}else{
		emit(ws,JSON.stringify(''));
	}
	clients.push(ws);
        console.log("number of connected users: "+clients.length);
	ws.on("close",()=>{
		console.log(ws.id+" left");
		cliIndex = clients.findIndex(i=>i.id===ws.id);
		console.log("deleted user: "+cliIndex);
		if(cliIndex>-1)
			clients.splice(cliIndex,1);
	});
	ws.on("message",(m)=>{
		console.log("%s from client %s",m,ws.id);
		let message = Buffer.from(m,"utf-8").toString();
		//emit(ws,message);
		if(noConnectedClients(ws.urlid)<2&&message!=''){
		update(ws.urlid,message);
		console.log('update request');
		}
		emit(ws,JSON.stringify(message));
	});
});
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
tele.startPolling()
//
//		Utility functions
//
function noConnectedClients(url){
	let count = 0;
	for(let i = 0;i < clients.length;i++){
		if(clients[i].urlid == url)
			count++;
	}
	return count;
}
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
function alertMe(req){
	let header = JSON.parse(JSON.stringify(req.headers))
  	let device = header['user-agent'].match(/\(([^)]+)\)/)[1];
	tele.telegram.sendMessage(process.env.TUID,"Accessed Realnotes"+" from "+device);
}
const usrname = process.env.USR_NAME;
const passwrd   = process.env.PASSWRD;
const uri = "mongodb+srv://"+usrname+":"+passwrd+"@cluster0.yazfjdn.mongodb.net/?retryWrites=true&w=majority";
async function insertNew(url,text){
        const client = new MongoClient(uri);
        const dbName = 'realnotes';
        const db = client.db(dbName);                        const collection = db.collection('notes');
        let isoString = new Date(Date.now()).toISOString();
        const insertResult = await collection.insertOne(     {
                "time":new Date(isoString),
                "data":{ "text":text,
                        "url":url
                        }
        });
        console.log('Inserted documents =>', insertResult);
        client.close();
        return 'done.';
        }
async function search(url){
        const client = new MongoClient(uri);
        const dbName = 'realnotes';
        const db = client.db(dbName);                        const collection = db.collection('notes');
        let result = await collection.findOne({"data.url":url})
        client.close();
        return result;
        }
async function count(url){                                     const client = new MongoClient(uri);                    const dbName = 'realnotes';                             const db = client.db(dbName);                        const collection = db.collection('notes');
        let result = await collection.estimatedDocumentCount();
        client.close();
        return result;
        }
async function getViewInc(url){
	const client = new MongoClient(uri);
       const dbName = 'realnotes';
       const db = client.db(dbName);                        const collection = db.collection('views');
	try{
	let result = await collection.findOne({"viewid":"global"});
	if(result)
	await collection.updateOne({ "viewid": "global" }, { $inc: { "views": 1 } });
	client.close();
        return result.views;
	}catch(err){
	console.log(err);
	}
	return null
	}
async function update(url,text){
        const client = new MongoClient(uri);
        const dbName = 'realnotes';
        const db = client.db(dbName);                        const collection = db.collection('notes');
        const updateResult = await collection.updateMany({ "data.url": url }, { $set: { "data.text": text } },{multi:true});
        client.close();
        return updateResult;
        }
