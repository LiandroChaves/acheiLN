import { Request, Response } from 'express';
import { CreateCategoryService } from '../services/CreateCategoryService';

class CreateCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, slug } = request.body;

        const createCategoryService = new CreateCategoryService();

        try {
            const category = await createCategoryService.execute({ name, slug });
            return response.status(201).json(category);
        } catch (err: any) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export { CreateCategoryController };