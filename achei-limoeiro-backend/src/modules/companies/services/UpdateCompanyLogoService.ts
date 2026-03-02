import { prisma } from '../../../database';

interface IRequest {
    companyId: string;
    logoFileName: string;
}

class UpdateCompanyLogoService {
    async execute({ companyId, logoFileName }: IRequest) {
        const company = await prisma.company.findUnique({
            where: { id: companyId },
        });

        if (!company) {
            throw new Error('Empresa não encontrada!');
        }

        const updatedCompany = await prisma.company.update({
            where: { id: companyId },
            data: {
                logoUrl: logoFileName,
            },
        });

        return updatedCompany;
    }
}

export { UpdateCompanyLogoService };