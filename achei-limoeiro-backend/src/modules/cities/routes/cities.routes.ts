import { Router } from 'express';
import { CreateCityController } from '../controllers/CreateCityController';
import { ensureAuthenticated } from '../../../shared/middlewares/ensureAuthenticated';
import { ensureAdmin } from '../../../shared/middlewares/ensureAdmin';
import { ListCitiesController } from '../controllers/ListCitiesController';

const citiesRoutes = Router();
const createCityController = new CreateCityController();
const listCitiesController = new ListCitiesController();


citiesRoutes.get('/', listCitiesController.handle);

citiesRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createCityController.handle
);

export { citiesRoutes };