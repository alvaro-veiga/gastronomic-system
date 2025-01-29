import express from 'express';
import PlatesController from '../controllers/plates.js';

const platesRouter = express.Router();

const platesController = new PlatesController();

platesRouter.get('/', async (req, res) => {
    const { success, statusCode, body } = await platesController.getplates();
    res.status(statusCode).send({ success, statusCode, body });
});

platesRouter.delete('/:id', async (req, res) => {
    const { success, statusCode, body } = await platesController.deleteplates(req.params.id);
    res.status(statusCode).send({ success, statusCode, body });
})
platesRouter.put('/:id', async (req, res) => {
    const { success, statusCode, body } = await platesController.updateUser(req.params.id, req.body);
    res.status(statusCode).send({ success, statusCode, body });
})

export default platesRouter