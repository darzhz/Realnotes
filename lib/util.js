exports.noConnectedClients = (url)=> {
  let count = 0;
  for (let i = 0; i < clients.length; i++) {
    if (clients[i].urlid == url) count++;
  }
  return count;
}
exports.emit = (emitter, mesg) => {
  for (let i = 0; i < clients.length; i++) {
    if (emitter.id != clients[i].id && emitter.urlid == clients[i].urlid) {
      clients[i].send(mesg);
      console.log("emmited to client " + i);
    }
  }
}
exports.uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
exports.alertMe = (req)=>{
  let header = JSON.parse(JSON.stringify(req.headers));
  let device = header["user-agent"].match(/\(([^)]+)\)/)[1];
  tele.telegram.sendMessage(
    process.env.TUID,
    "Accessed Realnotes" + " from " + device + "link : " + req.params.id
  );
}