import { Request, Response } from 'express';
import { ApproveCompanyService } from '../services/ApproveCompanyService';

class ApproveCompanyController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const approveCompanyService = new ApproveCompanyService();

        try {
            const company = await approveCompanyService.execute(id as string);
            return response.json(company);
        } catch (err: any) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export { ApproveCompanyController };