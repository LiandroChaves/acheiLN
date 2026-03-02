import { compare } from 'bcryptjs';
import { prisma } from '../../../database';

interface IRequest {
    password: string;
}

class AuthorizeAdminService {
    async execute({ password }: IRequest): Promise<boolean> {
        const admins = await prisma.user.findMany({
            where: { role: 'ADMIN' }
        });

        for (const admin of admins) {
            const passwordMatch = await compare(password, admin.password);
            if (passwordMatch) return true;
        }

        throw new Error('Senha de administrador incorreta, mn!');
    }
}

export { AuthorizeAdminService };