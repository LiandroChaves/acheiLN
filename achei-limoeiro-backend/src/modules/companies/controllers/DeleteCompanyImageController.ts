import { Request, Response } from 'express';
import { DeleteCompanyImageService } from '../services/DeleteCompanyImageService';

class DeleteCompanyImageController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteCompanyImageService = new DeleteCompanyImageService();

        try {
            await deleteCompanyImageService.execute({
                imageId: id as string,
            });

            return response.status(204).send();
        } catch (err: any) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export { DeleteCompanyImageController };
