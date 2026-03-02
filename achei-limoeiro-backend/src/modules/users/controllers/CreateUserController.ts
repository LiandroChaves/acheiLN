import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password, role } = request.body;

        const createUserService = new CreateUserService();

        try {
            const user = await createUserService.execute({ name, email, password, role });
            return response.status(201).json(user);
        } catch (err: any) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export { CreateUserController };