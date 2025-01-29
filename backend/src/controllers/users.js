import UserDataAccess from "../dataAccess/users.js";
import { ok, serverError} from "../helpers/httpResponse.js";

export default class UsersController {
    constructor() {
        this.dataAcess = new UserDataAccess();
    }

    async getUsers() {
        try {
            const users = await this.dataAcess.getUsers();
            return ok(users);
        } catch(error) {
            return serverError(error)
        }
    }

    async deleteUsers(userId) {
        try {
            const result = await this.dataAcess.deleteUsers(userId);
            return ok(result);
        } catch(error) {
            return serverError(error)
        }
    }
    async updateUser(userId, userData) {
        try {
            const result = await this.dataAcess.updateUser(userId, userData);
            return ok(result);
        } catch(error) {
            return serverError(error)
        }
    }
}