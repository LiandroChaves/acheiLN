import { Request, Response } from 'express';
import { GetCompanyDetailsService } from '../services/GetCompanyDetailsService';

class GetCompanyDetailsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const getCompanyDetailsService = new GetCompanyDetailsService();

        try {
            const company = await getCompanyDetailsService.execute(id as string);
            return response.json(company);
        } catch (err: any) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export { GetCompanyDetailsController };