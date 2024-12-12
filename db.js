const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const url = "mongodb://localhost:27017/";
let dbName ;
async function getDatabase(){
    const client = await MongoClient.connect(url);
    dbName = client.db("Employee");
    if(!dbName) throw err
    return dbName;
}

module.exports = {
    getDatabase
}
// async function test(){
//        const db = await getDatabase();
//        console.log(db)
// }
// test()
