import {MongoClient} from 'mongodb';
import bluebird from 'bluebird';
import config from 'config';

// Connection URL
// Database Name
const {dbName, url} = config.mongo;

// Create a new MongoClient
const client = new MongoClient(url);


bluebird.promisifyAll(client);
let db = null;

export const getDb = async () => {
    if (db) {
        return db
    } else {
        try {
            await client.connectAsync();
        } catch (ex) {
            console.log("Unable to connect to mongoDB : ", ex);
            return process.exit(0);
        }
        db = client.db(dbName);
        return db;
    }
};


