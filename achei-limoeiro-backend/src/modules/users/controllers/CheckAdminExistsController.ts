import { Request, Response } from 'express';
import { CheckAdminExistsService } from '../services/CheckAdminExistsService';

class CheckAdminExistsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const checkAdminExistsService = new CheckAdminExistsService();

        try {
            const exists = await checkAdminExistsService.execute();
            return response.json({ exists });
        } catch (err: any) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export { CheckAdminExistsController };