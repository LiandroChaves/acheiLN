import { Request, Response } from 'express';
import { CreateCompanyService } from '../services/CreateCompanyService';

class CreateCompanyController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            name,
            description,
            address,
            phone,
            whatsapp,
            instagram,
            openingHours,
            cityId,
            categoryId
        } = request.body;

        const userId = request.user.id;

        const createCompanyService = new CreateCompanyService();

        try {
            const company = await createCompanyService.execute({
                name,
                description,
                address,
                phone,
                whatsapp,
                instagram,
                openingHours,
                userId,
                cityId,
                categoryId
            });

            return response.status(201).json(company);
        } catch (err: any) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export { CreateCompanyController };