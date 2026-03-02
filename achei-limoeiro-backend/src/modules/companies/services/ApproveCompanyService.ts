import { prisma } from '../../../database';

class ApproveCompanyService {
    async execute(companyId: string) {
        const companyExists = await prisma.company.findUnique({
            where: { id: companyId },
        });

        if (!companyExists) {
            throw new Error('Empresa não encontrada em Limoeiro, mn!');
        }

        const company = await prisma.company.update({
            where: { id: companyId },
            data: {
                isApproved: true,
            },
        });

        return company;
    }
}

export { ApproveCompanyService };