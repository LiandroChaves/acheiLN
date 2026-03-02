import { Request, Response } from 'express';
import { CreateCityService } from '../services/CreateCityService';

class CreateCityController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, slug } = request.body;

        const createCityService = new CreateCityService();

        try {
            const city = await createCityService.execute({ name, slug });
            return response.status(201).json(city);
        } catch (err: any) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export { CreateCityController };