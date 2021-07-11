/*
// This file is subject to the terms and conditions defined in
// file 'LICENSE.md', which is part of this source code package.
*/

// user config
const options = {
  collection: 'tasks',
  dataset: null,
  replace: true,
}

const HOST = '10.0.0.29';
const PORT = 27018;
const DBNAME = 'challenger';
const DBUSERNAME = 'root';
const DBPASSWOARD = 'insecure';
const DBAUTHSOURCE = 'admin';

// script
const { MongoClient } = require('mongodb');
const fs = require('fs');
var path = require('path');

// connection URL
const url = `mongodb://${DBUSERNAME}:${DBPASSWOARD}@${HOST}:${PORT}/${DBNAME}?authSource=${DBAUTHSOURCE}`;

// Create a new MongoClient
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const run = async () => {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Connected successfully to server');

    const database = client.db('freestyle');

    // if replacing the collection...
    if(options.replace){
      try {
        await database.collection(options.collection).drop();
        await database.createCollection(options.collection);
      } catch {
        console.error('failed to replace collection');
      }
    }

    // now populate with data
    if(options.dataset){
      try {
        const collection = database.collection(options.collection);
        const documents = JSON.parse(fs.readFileSync(`./../datasets/${options.collection}/${options.dataset}.json`));
        const result = await collection.insertMany(documents);
      } catch (e) {
        console.error('error inserting documents');
        console.error(e);
      }
    }

  } finally {
    // Ensures that the client will close when you finish/error
    console.log('done - closing connection')
    await client.close();
  }
}

run();
