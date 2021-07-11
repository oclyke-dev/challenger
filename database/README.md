# database
this the database for freestyle
it allows for development as well as production deployment
mongodb runs in a docker container to facilitate easy deployment

## using the database

### starting the container
```
docker-compose up -d
```

### stopping the container
```
docker-compose down
```

### remote access
you can connect remotely to a running container using the proper host and port. for example:
```
mongo 192.168.7.71:27017
```

**w/ authentication:**
*mongo cli*
```
mongo mongodb://192.168.7.71:27017/freestyle --authenticationDatabase admin --username root --password insecure
```

*node*
``` javascript
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://root:insecure@192.168.7.71:27017/freestyle?authSource=admin';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  client.close();
});
```

### data persistence
as there is a bind mount between the container and the local ```db``` directory you can safely start, stop, and delete the container without destroying the data (except perhaps if you interrupt the container mid-operation). there are a few ways to drop data:

* drop a collection by running ```tools/load-dataset.js``` w/ the proper collection name and ```dataset: null``` w/ ```replace: true```
* (**nuclear option**) just stop the container, delete everything in ```db``` directory, and then restart the container


## repo structure
brief intro to what lives where

### datasets
datasets which can be loaded into a development database for testing purposes. may contain both auto-generated and custom datasets in json format. subdirectories correspond to collections within the database.

### db
this directory gets mounted to the container and is used to store the actual binary database data. the contents, except for a placeholder file ```.reserved``` are all gitignored. do not use for other storage.

### tools
contains utility node scripts. run these scripts from within the ```tools``` directory using ```node```.

