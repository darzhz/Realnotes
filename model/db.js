const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
exports.initDb = function(){
const usrname = process.env.USR_NAME;
const passwrd = process.env.PASSWRD;
const uri =
  "mongodb+srv://" +
  usrname +
  ":" +
  passwrd +
  "@cluster0.yazfjdn.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  const db = client.db(process.env.DB_NAME);
  return {client,db};
}