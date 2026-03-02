import { prisma } from '../../../database';
import { CreateCityDTO } from '../dtos/CreateCityDTO';

class CreateCityService {
    async execute({ name, slug }: CreateCityDTO) {
        const cityAlreadyExists = await prisma.city.findUnique({
            where: { slug },
        });

        if (cityAlreadyExists) {
            throw new Error('Essa cidade já está cadastrada, mn!');
        }

        const city = await prisma.city.create({
            data: {
                name,
                slug,
            },
        });

        return city;
    }
}

export { CreateCityService };