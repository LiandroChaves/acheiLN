import { prisma } from '../../../database';

interface IRequest {
    cityId: string;
    categoryId?: string;
}

class ListCompaniesService {
    async execute({ cityId, categoryId }: IRequest) {
        const companies = await prisma.company.findMany({
            where: {
                cityId,
                categoryId,
                isApproved: true,
            },
            include: {
                category: true,
            },
            orderBy: [
                { plan: 'desc' },
                { name: 'asc' },
            ],
        });

        return companies;
    }
}

export { ListCompaniesService };