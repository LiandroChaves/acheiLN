import { Request, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const authenticateUserService = new AuthenticateUserService();

        try {
            const data = await authenticateUserService.execute({ email, password });
            return response.json(data);
        } catch (err: any) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export { AuthenticateUserController };