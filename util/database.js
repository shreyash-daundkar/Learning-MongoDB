const mongodb = require('mongodb');


let _db;


exports.mongoConnect = async callback => {
  try {
    const mongoClient = mongodb.MongoClient;

    const client = await mongoClient.connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_USERNAME}.kaqa2nx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
     );

    _db = client.db();
    
    callback(); 

  } catch (error) {
    console.error(error.stack);
  }
}


exports.getDb = () => {

  if(_db) return _db;

  throw 'Database Not Found';
}