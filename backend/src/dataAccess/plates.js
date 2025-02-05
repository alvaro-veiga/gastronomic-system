import { Mongo } from "../database/mongo.js";
import { ObjectId } from "mongodb";

const collectionName = "plates";

export default class PlatesDataAccess {
    async getPlates() {
        const result = await Mongo.database
        .collection(collectionName)
        .find({})
        .toArray();

        return result;
    }

    async getAvailablePlates() {
        const result = await Mongo.database
        .collection(collectionName)
        .find({ available: true})
        .toArray();

        return result;
    }

    async addPlate(plateData) {
        const result = await Mongo.database
        .collection(collectionName)
        .insertOne(plateData);

        return result;
    }

    async deletePlates(platesId) {
        const result = await Mongo.database
        .collection(collectionName)
        .findOneAndDelete({ _id: new ObjectId(platesId) });

        return result;
    }
    async updatePlates(platesId, platesData) {

        const result = await Mongo.database
        .collection(collectionName)
        .findOneAndUpdate(
            { _id: new ObjectId(platesId) },
            { $set: platesData },
        );
        
        return result;
    }
}
