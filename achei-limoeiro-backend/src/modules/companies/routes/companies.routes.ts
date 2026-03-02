import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../config/upload';
import { CreateCompanyController } from '../controllers/CreateCompanyController';
import { ApproveCompanyController } from '../controllers/ApproveCompanyController';
import { ListCompaniesController } from '../controllers/ListCompaniesController';
import { GetCompanyDetailsController } from '../controllers/GetCompanyDetailsController';
import { ensureAuthenticated } from '../../../shared/middlewares/ensureAuthenticated';
import { ensureAdmin } from '../../../shared/middlewares/ensureAdmin';
import { UpdateCompanyPlanController } from '../controllers/UpdateCompanyPlanController';
import { UpdateCompanyLogoController } from '../controllers/UpdateCompanyLogoController';
import { ListUserCompaniesController } from '../controllers/ListUserCompaniesController';
import { UpdateCompanyController } from '../controllers/UpdateCompanyController';
import { AddCompanyImagesController } from '../controllers/AddCompanyImagesController';
import { DeleteCompanyImageController } from '../controllers/DeleteCompanyImageController';

const companiesRoutes = Router();
const upload = multer(uploadConfig);

const createCompanyController = new CreateCompanyController();
const approveCompanyController = new ApproveCompanyController();
const listCompaniesController = new ListCompaniesController();
const getCompanyDetailsController = new GetCompanyDetailsController();
const updateCompanyPlanController = new UpdateCompanyPlanController();
const updateCompanyLogoController = new UpdateCompanyLogoController();
const listUserCompaniesController = new ListUserCompaniesController();
const updateCompanyController = new UpdateCompanyController();
const addCompanyImagesController = new AddCompanyImagesController();
const deleteCompanyImageController = new DeleteCompanyImageController();

// 1. ROTAS PÚBLICAS ESTÁTICAS
companiesRoutes.get('/', listCompaniesController.handle);

// 2. ROTA PRIVADA ESTÁTICA (Definida ANTES da dinâmica :id)
companiesRoutes.get('/me', ensureAuthenticated, listUserCompaniesController.handle);

// 3. ROTA PÚBLICA DINÂMICA (Agora ela não 'come' o /me)
companiesRoutes.get('/:id', getCompanyDetailsController.handle);

// 4. MIDDLEWARE PARA AS ROTAS DE ESCRITA
companiesRoutes.use(ensureAuthenticated);

companiesRoutes.post('/', createCompanyController.handle);
companiesRoutes.put('/:id', updateCompanyController.handle);

companiesRoutes.patch(
    '/:id/approve',
    ensureAdmin,
    approveCompanyController.handle
);

companiesRoutes.patch(
    '/:id/plan',
    ensureAdmin,
    updateCompanyPlanController.handle
);

companiesRoutes.patch(
    '/:id/logo',
    upload.single('logo'),
    updateCompanyLogoController.handle
);

companiesRoutes.post(
    '/:id/images',
    upload.array('images', 10),
    addCompanyImagesController.handle
);

companiesRoutes.delete(
    '/images/:id',
    deleteCompanyImageController.handle
);

export { companiesRoutes };