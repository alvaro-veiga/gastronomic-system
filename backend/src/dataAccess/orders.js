import { Mongo } from "../database/mongo.js";
import { ObjectId } from "mongodb";

const collectionName = "orders";

export default class OrdersDataAccess {
    async getOrders() {
        const result = await Mongo.database
        .collection(collectionName)
        .find({})
        .toArray();

        return result;
    }

    async addOrder(orderData) {
        const result = await Mongo.database
        .collection(collectionName)
        .insertOne(orderData);

        return result;
    }

    async deleteOrders(ordersId) {
        const result = await Mongo.database
        .collection(collectionName)
        .findOneAndDelete({ _id: new ObjectId(ordersId) });

        return result;
    }
    async updateOrders(ordersId, ordersData) {

        const result = await Mongo.database
        .collection(collectionName)
        .findOneAndUpdate(
            { _id: new ObjectId(ordersId) },
            { $set: ordersData },
        );
        
        return result;
    }
}
