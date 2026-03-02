import { Request, Response } from 'express';
import { ListUserCompaniesService } from '../services/ListUserCompaniesService';

class ListUserCompaniesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const userId = request.user.id;

        const listUserCompaniesService = new ListUserCompaniesService();

        try {
            const companies = await listUserCompaniesService.execute(userId);
            return response.json(companies);
        } catch (err: any) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export { ListUserCompaniesController };