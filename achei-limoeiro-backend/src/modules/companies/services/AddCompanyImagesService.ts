import { prisma } from '../../../database';

interface IRequest {
    companyId: string;
    filenames: string[];
}

class AddCompanyImagesService {
    async execute({ companyId, filenames }: IRequest) {
        const company = await prisma.company.findUnique({
            where: { id: companyId },
        });

        if (!company) {
            throw new Error('Empresa não encontrada!');
        }

        const imagesData = filenames.map((filename) => ({
            companyId,
            imageUrl: filename,
        }));

        await prisma.companyImage.createMany({
            data: imagesData,
        });

        return imagesData;
    }
}

export { AddCompanyImagesService };