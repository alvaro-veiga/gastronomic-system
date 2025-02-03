import express from 'express';
import PlatesController from '../controllers/plates.js';

const platesRouter = express.Router();

const platesController = new PlatesController();

platesRouter.get('/', async (req, res) => {
    const { success, statusCode, body } = await platesController.getPlates();
    res.status(statusCode).send({ success, statusCode, body });
});

platesRouter.get('/availiables', async (req, res) => {
    const { success, statusCode, body } = await platesController.getAvailablePlates();
    res.status(statusCode).send({ success, statusCode, body });
})

platesRouter.post('/', async (req, res) => {
    const { success, statusCode, body } = await platesController.addPlates(req.body);
    res.status(statusCode).send({ success, statusCode, body });
})

platesRouter.delete('/:id', async (req, res) => {
    const { success, statusCode, body } = await platesController.deletePlates(req.params.id);
    res.status(statusCode).send({ success, statusCode, body });
})

platesRouter.put('/:id', async (req, res) => {
    const { success, statusCode, body } = await platesController.updatePlates(req.params.id, req.body);
    res.status(statusCode).send({ success, statusCode, body });
})

export default platesRouter