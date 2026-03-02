import { Request, Response } from 'express';
import { UpdateCompanyLogoService } from '../services/UpdateCompanyLogoService';

class UpdateCompanyLogoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const logoFileName = request.file?.filename;

        if (!logoFileName) {
            throw new Error('Arquivo de logo não enviado!');
        }

        const updateCompanyLogoService = new UpdateCompanyLogoService();

        try {
            const company = await updateCompanyLogoService.execute({
                companyId: id as string,
                logoFileName,
            });

            return response.json(company);
        } catch (err: any) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export { UpdateCompanyLogoController };