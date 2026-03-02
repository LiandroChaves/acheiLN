import { prisma } from '../../../database';

class ListCitiesService {
    async execute() {
        const cities = await prisma.city.findMany({
            orderBy: {
                name: 'asc'
            }
        });

        return cities;
    }
}

export { ListCitiesService };