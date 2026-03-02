import { Request, Response } from 'express';
import { ListCompaniesService } from '../services/ListCompaniesService';

class ListCompaniesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { cityId, categoryId, approved } = request.query;

        const listCompaniesService = new ListCompaniesService();

        try {
            const companies = await listCompaniesService.execute({
                cityId: cityId as string,
                categoryId: categoryId as string,
                isApproved: approved !== undefined ? approved === 'true' : undefined,
            });

            return response.json(companies);
        } catch (err: any) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export { ListCompaniesController };