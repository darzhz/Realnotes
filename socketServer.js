const util = require("./lib/util");
const note = require("./model/notes");
const webSocket = require("ws");
exports.initWeSocketServer = async (server) => {
  const wss = new webSocket.Server({ server: server });
  wss.on("connection", async (ws) => {
    console.log("new connection");
    ws.id = util.uuidv4();
    ws.urlid = curUser;
    //if there are no users note.search database
    if (util.noConnectedClients(ws.urlid) == 0) {
      let text;
      let res = await note.search(ws.urlid);
      console.log(res);
      if (res) {
        console.log("search operation");
        text = JSON.stringify(res.data.text);
        ws.send(text);
      } else {
        console.log("database insertion");
        note.insert(ws.urlid, "");
        ws.send("");
      }
    } else {
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
      console.log("%s from client %s", m, ws.id);
      let message = Buffer.from(m, "utf-8").toString();
      //util.emit(ws,message);
      if (util.noConnectedClients(ws.urlid) < 2 && message != "") {
        note.update(ws.urlid, message);
        console.log("note.update request");
      }
      util.emit(ws, JSON.stringify(message));
    });
  });
};