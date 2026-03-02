import { Router } from 'express';
import { CreateCategoryController } from '../controllers/CreateCategoryController';
import { ensureAuthenticated } from '../../../shared/middlewares/ensureAuthenticated';
import { ensureAdmin } from '../../../shared/middlewares/ensureAdmin';
import { ListCategoriesController } from '../controllers/ListCategoriesController';

const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createCategoryController.handle
);

categoriesRoutes.get('/', listCategoriesController.handle);



export { categoriesRoutes };