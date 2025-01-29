import PlatesDataAccess from "../dataAccess/plates.js";
import { ok, serverError} from "../helpers/httpResponse.js";

export default class PlatessController {
    constructor() {
        this.dataAcess = new PlatesDataAccess();
    }

    async getPlates() {
        try {
            const plates = await this.dataAcess.getPlates();
            return ok(plates);
        } catch(error) {
            return serverError(error)
        }
    }

    async deletePlates(platesId) {
        try {
            const result = await this.dataAcess.deletePlates(platesId);
            return ok(result);
        } catch(error) {
            return serverError(error)
        }
    }
    async updatePlates(platesId, platesData) {
        try {
            const result = await this.dataAcess.updatePlates(platesId, platesData);
            return ok(result);
        } catch(error) {
            return serverError(error)
        }
    }
}