import { Router } from 'express';
import { citiesRoutes } from '../../modules/cities/routes/cities.routes';
import { categoriesRoutes } from '../../modules/cities/routes/categories.routes';
import { usersRoutes } from '../../modules/users/routes/users.routes';
import { companiesRoutes } from '../../modules/companies/routes/companies.routes';

const routes = Router();

routes.use('/cities', citiesRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/users', usersRoutes);
routes.use('/companies', companiesRoutes);

export { routes };