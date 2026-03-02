import path from 'path';
import fs from 'fs';
import { prisma } from '../../../database';

interface IRequest {
    imageId: string;
}

class DeleteCompanyImageService {
    async execute({ imageId }: IRequest) {
        const image = await prisma.companyImage.findUnique({
            where: { id: imageId },
        });

        if (!image) {
            throw new Error('Imagem não encontrada!');
        }

        // Delete from database
        await prisma.companyImage.delete({
            where: { id: imageId },
        });

        // Delete from disk
        const uploadPath = path.resolve(__dirname, '..', '..', '..', '..', 'uploads', image.companyId as string, image.imageUrl);

        try {
            if (fs.existsSync(uploadPath)) {
                await fs.promises.unlink(uploadPath);
            }
        } catch (err) {
            console.error(`Erro ao deletar arquivo: ${uploadPath}`, err);
        }

        return;
    }
}

export { DeleteCompanyImageService };
