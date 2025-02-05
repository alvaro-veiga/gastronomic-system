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
            },
            {
                $group: {
                    _id: '$_id',
                    userDetails: { $first: '$userDetails'},
                    orderItems: {$push: 'orderItems'},
                    pickupStatus: {$first: '$pickupStatus'},
                    pickupTime: { $first: '$pickupTime'}
                }
            }
        ])
        .toArray();

        return result;
    }

    async getOrdersByUserId(userId) {
        const result = await Mongo.database
        .collection(collectionName)
        .aggregate([ 
            {
                $match: { userId: new ObjectId(userId)}
            },
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
            },
            {
                $group: {
                    _id: '$_id',
                    userDetails: { $first: '$userDetails'},
                    orderItems: {$push: 'orderItems'},
                    pickupStatus: {$first: '$pickupStatus'},
                    pickupTime: { $first: '$pickupTime'}
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

        const itemsToDelete = await Mongo.database
        .collection('orderItems')
        .deleteMany({ordersId: new ObjectId(ordersId)})

        const orderToDelete = await Mongo.database
        .collection(collectionName)
        .findOneAndDelete({ _id: new ObjectId(ordersId) });
        
        const result = {
            itemsToDelete,
            orderToDelete
        }

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
