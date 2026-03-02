import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { prisma } from '../../../database';
import { AuthenticateUserDTO } from '../dtos/AuthenticateUserDTO';

class AuthenticateUserService {
    async execute({ email, password }: AuthenticateUserDTO) {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new Error('E-mail ou senha incorretos!');
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('E-mail ou senha incorretos!');
        }

        const token = sign(
            {
                role: user.role,
            },
            process.env.JWT_SECRET || 'secret_key_limoeiro',
            {
                subject: user.id,
                expiresIn: '1d',
            }
        );

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        };
    }
}

export { AuthenticateUserService };