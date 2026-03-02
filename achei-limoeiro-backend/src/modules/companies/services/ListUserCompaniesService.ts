import { prisma } from '../../../database';

class ListUserCompaniesService {
    async execute(userId: string) {
        const companies = await prisma.company.findMany({
            where: {
                userId,
            },
            include: {
                category: true,
                city: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return companies;
    }
}

export { ListUserCompaniesService };