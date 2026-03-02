import { prisma } from '../../../database';
import { CreateCategoryDTO } from '../dtos/CreateCategoryDTO';

class CreateCategoryService {
    async execute({ name, slug }: CreateCategoryDTO) {
        const categoryAlreadyExists = await prisma.category.findUnique({
            where: { slug },
        });

        if (categoryAlreadyExists) {
            throw new Error('Essa categoria já existe, mn!');
        }

        const category = await prisma.category.create({
            data: {
                name,
                slug,
            },
        });

        return category;
    }
}

export { CreateCategoryService };