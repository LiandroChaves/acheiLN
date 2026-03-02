import { prisma } from '../../../database';
import { UpdateCompanyPlanDTO } from '../dtos/UpdateCompanyPlanDTO';

class UpdateCompanyPlanService {
    async execute({ companyId, plan }: UpdateCompanyPlanDTO) {
        const companyExists = await prisma.company.findUnique({
            where: { id: companyId },
        });

        if (!companyExists) {
            throw new Error('Empresa não encontrada, mn!');
        }

        const company = await prisma.company.update({
            where: { id: companyId },
            data: { plan },
        });

        return company;
    }
}

export { UpdateCompanyPlanService };