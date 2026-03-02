import { Request, Response } from 'express';
import { ListCategoriesService } from '../services/ListCategoriesService';

class ListCategoriesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listCategoriesService = new ListCategoriesService();

        try {
            const categories = await listCategoriesService.execute();
            return response.json(categories);
        } catch (err: any) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export { ListCategoriesController };