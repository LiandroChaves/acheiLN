import { Request, Response } from 'express';
import { UpdateCompanyService } from '../services/UpdateCompanyService';

class UpdateCompanyController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const userId = request.user.id;
        const {
            name,
            description,
            street,
            number,
            neighborhood,
            city_name,
            state,
            phone,
            whatsapp,
            instagram,
            openingHours,
            categoryId
        } = request.body;

        const updateCompanyService = new UpdateCompanyService();

        try {
            const company = await updateCompanyService.execute(id as string, userId, request.user.role, {
                name,
                description,
                street,
                number,
                neighborhood,
                city_name,
                state,
                phone,
                whatsapp,
                instagram,
                openingHours,
                categoryId
            });

            return response.json(company);
        } catch (err: any) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export { UpdateCompanyController };