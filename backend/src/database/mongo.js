import { text } from "express";
import { MongoClient } from "mongodb"

export const Mongo = {
    async connect({ mongoConnectionString, MongoDbName}) {

        try {
            const client = new MongoClient(mongoConnectionString);
            await client.connect();
            const database = client.db(MongoDbName);

            this.client = client;
            this.database = database;

            return "Successfully connected to the database";
        }

        catch (error) {
            return { text: "Error connecting to the database", error: error};
        }

    }
};