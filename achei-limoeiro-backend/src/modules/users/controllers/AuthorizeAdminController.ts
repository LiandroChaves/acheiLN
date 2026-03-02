import { Request, Response } from 'express';
import { AuthorizeAdminService } from '../services/AuthorizeAdminService';

class AuthorizeAdminController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { password } = request.body;
        const authorizeAdminService = new AuthorizeAdminService();

        try {
            await authorizeAdminService.execute({ password });
            return response.json({ authorized: true });
        } catch (err: any) {
            return response.status(401).json({ error: err.message });
        }
    }
}

export { AuthorizeAdminController };