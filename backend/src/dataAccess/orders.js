import { Mongo } from "../database/mongo.js";
import { ObjectId } from "mongodb";

const collectionName = "orders";

export default class OrdersDataAccess {
    async getOrders() {
        const result = await Mongo.database
        .collection(collectionName)
        .aggregate([ 
            {
                $lookup: {
                    from: 'orderItems',
                    localField: '_id',
                    foreignField: 'orderId',
                    as: 'orderItems'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            {
                $unwind: '$orderItems'
            },
            {
                $lookup: {
                    from: 'plates',
                    localField: 'orderItems.plateId',
                    foreignField: '_id',
                    as: 'orderItems.itemDetails'
                }
            },
            {
                $project: {
                    "userDetails.password": 0,
                    "userDetails.salt":0
                }
            }
        ])
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

        if(!newOrder.insertedId) {
            throw new Error('Order cannot be inserted')
        }

        items.map((item) => {
            item.plateId = new ObjectId(item.plateId)
            item.orderId = new ObjectId(newOrder.insertedId)
        })

        const result = await Mongo.database
        .collection('orderItems')
        .insertMany(items)

        return result
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
