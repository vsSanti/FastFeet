import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import DeliveryController from './app/controllers/DeliveryController';
import DeliveryFinishController from './app/controllers/DeliveryFinishController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryStartController from './app/controllers/DeliveryStartController';
import FileController from './app/controllers/FileController';
import OrderController from './app/controllers/OrderController';
import ProblemController from './app/controllers/ProblemController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/auth';
import delayMiddleware from './app/middlewares/delay';

const routes = new Router();
const upload = multer(multerConfig);

/**
 * Adiciona delay nas requisições para adicionar realidade no desenvolvimento
 * da aplicação. A duração do delay é um valor aleatório entre 300ms e 600ms.
 */
if (process.env.NODE_ENV === 'development') {
  routes.use(delayMiddleware);
}

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/deliverymen/:deliveryman_id', DeliverymanController.show);

routes.get('/deliveryman/:deliveryman_id/deliveries', DeliveryController.show);
routes.put('/deliveries/:order_id/start', DeliveryStartController.update);
routes.put('/deliveries/:order_id/finish', DeliveryFinishController.update);

routes.get('/delivery/:order_id/problems', ProblemController.show);
routes.post('/delivery/:order_id/problems', ProblemController.store);

routes.post('/files', upload.single('file'), FileController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:recipient_id', RecipientController.show);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:recipient_id', RecipientController.update);
routes.delete('/recipients/:recipient_id', RecipientController.destroy);

routes.get('/deliverymen', DeliverymanController.index);
routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen/:deliveryman_id', DeliverymanController.update);
routes.delete('/deliverymen/:deliveryman_id', DeliverymanController.destroy);

routes.get('/orders', OrderController.index);
routes.get('/orders/:order_id', OrderController.show);
routes.post('/orders', OrderController.store);
routes.put('/orders/:order_id', OrderController.update);
routes.delete('/orders/:order_id', OrderController.destroy);

routes.get('/deliveries/problems', ProblemController.index);
routes.delete('/problem/:problem_id/cancel-order', ProblemController.destroy);

export default routes;
