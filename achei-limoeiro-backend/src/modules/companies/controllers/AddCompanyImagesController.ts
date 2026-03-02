import { Request, Response } from 'express';
import { AddCompanyImagesService } from '../services/AddCompanyImagesService';

class AddCompanyImagesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const imagesFiles = request.files as Express.Multer.File[];

        if (!imagesFiles || imagesFiles.length === 0) {
            throw new Error('Nenhuma imagem enviada!');
        }

        const filenames = imagesFiles.map((file) => file.filename);
        const addCompanyImagesService = new AddCompanyImagesService();

        try {
            const images = await addCompanyImagesService.execute({
                companyId: id as string,
                filenames,
            });

            return response.status(201).json(images);
        } catch (err: any) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export { AddCompanyImagesController };