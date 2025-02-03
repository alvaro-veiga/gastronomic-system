import OrdersDataAccess from "../dataAccess/orders.js";
import { ok, serverError} from "../helpers/httpResponse.js";

export default class OrdersController {
    constructor() {
        this.dataAcess = new OrdersDataAccess();
    }

    async getOrders() {
        try {
            const orders = await this.dataAcess.getOrders();
            return ok(orders);
        } catch(error) {
            return serverError(error)
        }
    }

    async addOrders(ordersData) {
        try {
            const result = await this.dataAcess.addPlate(ordersData);
            return ok(result);
        } catch(error) {
            return serverError(error)
        }
    }

    async deleteOrders(ordersId) {
        try {
            const result = await this.dataAcess.deleteOrders(ordersId);
            return ok(result);
        } catch(error) {
            return serverError(error)
        }
    }
    async updateOrders(ordersId, ordersData) {
        try {
            const result = await this.dataAcess.updateOrders(ordersId, ordersData);
            return ok(result);
        } catch(error) {
            return serverError(error)
        }
    }
}