import { Request, Response } from 'express';
import { UpdateCompanyService } from '../services/UpdateCompanyService';

class UpdateCompanyController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const userId = request.user.id;
        const data = request.body;

        const updateCompanyService = new UpdateCompanyService();

        try {
            const company = await updateCompanyService.execute(id as string, userId, data);
            return response.json(company);
        } catch (err: any) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export { UpdateCompanyController };