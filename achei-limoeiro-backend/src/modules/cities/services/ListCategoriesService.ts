import { prisma } from '../../../database';

class ListCategoriesService {
    async execute() {
        const categories = await prisma.category.findMany({
            orderBy: {
                name: 'asc',
            },
        });

        return categories;
    }
}

export { ListCategoriesService };