import { prisma } from '../../../database';

class CheckAdminExistsService {
    async execute(): Promise<boolean> {
        const admin = await prisma.user.findFirst({
            where: {
                role: 'ADMIN',
            },
        });

        return !!admin;
    }
}

export { CheckAdminExistsService };