import { hash } from 'bcryptjs';
import { prisma } from '../../../database';
import { CreateUserDTO } from '../dtos/CreateUserDTO';

class CreateUserService {
    async execute({ name, email, password, role }: CreateUserDTO) {
        const userAlreadyExists = await prisma.user.findUnique({ where: { email } });

        if (userAlreadyExists) {
            throw new Error('Esse e-mail já tá cadastrado, mn!');
        }

        const passwordHash = await hash(password, 8);

        // Se o cara quer ser ADMIN, a gente checa se já existe algum no banco
        let finalRole = role || 'OWNER';

        if (role === 'ADMIN') {
            const adminExists = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
            // Se já tem admin, o novo só vira admin com convite (ou você pode barrar aqui)
            if (adminExists) {
                throw new Error('Já existe um administrador no sistema!');
            }
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: passwordHash,
                role: finalRole as 'ADMIN' | 'OWNER',
            },
        });

        return { id: user.id, name: user.name, email: user.email, role: user.role };
    }
}

export { CreateUserService };