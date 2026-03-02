import { Request, Response } from 'express';
import { UpdateCompanyPlanService } from '../services/UpdateCompanyPlanService';

class UpdateCompanyPlanController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { plan } = request.body;

        const updateCompanyPlanService = new UpdateCompanyPlanService();

        try {
            const company = await updateCompanyPlanService.execute({
                companyId: id as string,
                plan,
            });

            return response.json(company);
        } catch (err: any) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export { UpdateCompanyPlanController };