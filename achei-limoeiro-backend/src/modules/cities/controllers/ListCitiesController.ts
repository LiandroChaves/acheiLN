import { Request, Response } from 'express';
import { ListCitiesService } from '../services/ListCitiesService';

class ListCitiesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listCitiesService = new ListCitiesService();

        try {
            const cities = await listCitiesService.execute();
            return response.json(cities);
        } catch (err: any) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export { ListCitiesController };