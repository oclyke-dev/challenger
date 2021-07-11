/*
// This file is subject to the terms and conditions defined in
// file 'LICENSE.md', which is part of this source code package.
*/

import {
  MongoClient,
  Collection,
  Db,
  WithId,
} from 'mongodb';

import {
  UserType,
  TaskType,
} from '../schema';

import {
  debug,
} from '../utility';

const HOST = '10.0.0.29';
const PORT = 27018;
const DBNAME = 'freestyle';
const DBUSERNAME = 'root';
const DBPASSWOARD = 'insecure';
const DBAUTHSOURCE = 'admin';

// connection URL
const url = `mongodb://${DBUSERNAME}:${DBPASSWOARD}@${HOST}:${PORT}/${DBNAME}?authSource=${DBAUTHSOURCE}`;

// Create a new MongoClient
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const database = (): Db => client.db('challenger');

export const collections = {
  users: (): Collection<WithId<UserType>> => database().collection('users'),
  tasks: (): Collection<WithId<TaskType>> => database().collection('tasks'),
};

export const connectMongo = async (): Promise<void> => {
  // Connect the client to the server
  await client.connect();
  // Establish and verify connection
  await client.db('admin').command({ ping: 1 });
  debug.log('Connected successfully to server');
};
