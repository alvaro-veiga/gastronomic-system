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
        const { items, ...orderDataRest } = orderData
        
        orderDataRest.createdAt = new Date()
        orderDataRest.pickupStatus = 'Pending'
        orderDataRest.userId = new ObjectId(orderDataRest.userId)

        const newOrder = await Mongo.database
        .collection(collectionName)
        .insertOne(orderDataRest)

        if (!newOrder.insertedId) {
            throw new Error("Order cannot be inserted")
        }

        items.map((item) =>{
            item.plateId = new ObjectId(item.plateId)
            item.orderId = new ObjectId(item.orderId)
        })

        const result = await Mongo.database
        .collection('ordeItems')
        .insertMany(orderData);

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
