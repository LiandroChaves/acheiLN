import { prisma } from '../../../database';

interface IRequest {
    cityId?: string; // Tornando opcional para caso o admin queira ver tudo
    categoryId?: string;
    isApproved?: boolean;
}

class ListCompaniesService {
    async execute({ cityId, categoryId, isApproved = true }: IRequest) {
        const companies = await prisma.company.findMany({
            where: {
                cityId,
                categoryId,
                isApproved: isApproved !== undefined ? isApproved : true,
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