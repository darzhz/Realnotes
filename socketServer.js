const util = require("./lib/util");
const note = require("./model/notes");
const format  = require("./lib/format");
const webSocket = require("ws");
exports.initWeSocketServer = async (server) => {
  const wss = new webSocket.Server({ server: server });
  wss.on("connection", async (ws) => {
    console.log("new connection");
    //setting connection id 
    ws.id = util.uuidv4();
    ws.urlid = curUser;
    //if there are no users search database
    if (util.noConnectedClients(ws.urlid) == 0) {
      let data;
      let res = await note.search(ws.urlid);
      console.log(res);
      if (res) {
        //sending exisiting data
        console.log("search operation");
        data = res.data;//JSON.stringify(res.data);
        //console.log(format.getNote(data.created,data.last_updated,0,data.text,data.lock));
        ws.send(format.getNote(data.created,data.last_updated,1,data.text,data.lock));
      } else {
        //new note created
        console.log("database insertion");
        note.insert(ws.urlid, "");
        ws.send(format.newNote());
      }
    } else {
      //request emit
      util.emit(ws, JSON.stringify(""));
    }
    clients.push(ws);
    console.log("number of connected users: " + clients.length);
    ws.on("close", () => {
      console.log(ws.id + " left");
      //deleting the user which has left
      cliIndex = clients.findIndex((i) => i.id === ws.id);
      console.log("deleted user: " + cliIndex);
      if (cliIndex > -1) clients.splice(cliIndex, 1);
    });
    ws.on("message", (m) => {
      //console.log("%s from client %s", m, ws.id);
      console.log("received from client "+m);
      let message = JSON.parse(m);//Buffer.from(m, "utf-8").toString();
      //util.emit(ws,message);
      if (util.noConnectedClients(ws.urlid) < 2 && message.message != "") {
        note.update(ws.urlid, message.message,message.lock);
        console.log("note.update request");
      }
      message.users = util.noConnectedClients(ws.urlid);
      util.emit(ws, JSON.stringify(message));
    });
  });
};