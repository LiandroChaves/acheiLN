import { prisma } from '../../../database';

class GetCompanyDetailsService {
    async execute(companyId: string) {
        const company = await prisma.company.findUnique({
            where: { id: companyId },
            include: {
                category: true,
                city: true,
                images: true,
            },
        });

        if (!company) {
            throw new Error('Essa empresa sumiu do mapa, mn!');
        }

        return company;
    }
}

export { GetCompanyDetailsService };