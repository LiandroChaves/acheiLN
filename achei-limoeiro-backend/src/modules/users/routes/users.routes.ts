import { Router } from 'express';
import { CreateUserController } from '../controllers/CreateUserController';
import { AuthenticateUserController } from '../controllers/AuthenticateUserController';
import { CheckAdminExistsController } from '../controllers/CheckAdminExistsController';
import { AuthorizeAdminController } from '../controllers/AuthorizeAdminController';

const usersRoutes = Router();
const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const checkAdminExistsController = new CheckAdminExistsController();
const authorizeAdminController = new AuthorizeAdminController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.post('/sessions', authenticateUserController.handle);
usersRoutes.get('/admin-exists', checkAdminExistsController.handle);
usersRoutes.post('/admin-verify', authorizeAdminController.handle);

export { usersRoutes };