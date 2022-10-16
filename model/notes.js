const data = require("../model/db");

exports.insert = async (url, text) => {
  const client = data.initDb();
  const collection = client.db.collection(process.env.DEFAULT_COLLECTION);
  let isoString = new Date(Date.now()).toISOString();
  const insertResult = await collection.insertOne({
    time: new Date(isoString),
    data: { text: text, url: url },
  });
  console.log("Inserted documents =>", insertResult);
  client.client.close();
  return "done.";
};
exports.search = async function (url) {
  const client = data.initDb();
  const collection = client.db.collection(process.env.DEFAULT_COLLECTION);
  let result = await collection.findOne({ "data.url": url });
  client.client.close();
  return result;
};
exports.count = async function () {
  const client = data.initDb();
  const collection = client.db.collection(process.env.DEFAULT_COLLECTION);
  let result = await collection.estimatedDocumentCount();
  console.log(result);
  client.client.close();
  return result;
};
exports.getViewInc = async function () {
  const client = data.initDb();
  const collection = client.db.collection("views");
  try {
    let result = await collection.findOne({ viewid: "global" });
    if (result)
      await collection.updateOne({ viewid: "global" }, { $inc: { views: 1 } });
    client.client.close();
    return result.views;
  } catch (err) {
    console.log(err);
  }
  return null;
};
exports.update = async function (url, text) {
  const client = data.initDb();
  const collection = client.db.collection(process.env.DEFAULT_COLLECTION);
  const updateResult = await collection.updateMany(
    { "data.url": url },
    { $set: { "data.text": text } },
    { multi: true }
  );
  client.client.close();
  return updateResult;
};