import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { hash } from 'bcryptjs';

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const passwordHash = await hash('123456', 8);

    const user = await prisma.user.upsert({
        where: { email: 'admin@acheilimoeiro.com.br' },
        update: {},
        create: {
            name: 'Admin Achei',
            email: 'admin@acheilimoeiro.com.br',
            password: passwordHash,
            role: 'ADMIN',
        },
    });

    const city = await prisma.city.upsert({
        where: { slug: 'limoeiro-do-norte' },
        update: {},
        create: {
            name: 'Limoeiro do Norte',
            slug: 'limoeiro-do-norte',
        },
    });

    const catRestaurante = await prisma.category.upsert({
        where: { slug: 'restaurantes' },
        update: {},
        create: {
            name: 'Restaurantes',
            slug: 'restaurantes',
        },
    });

    const catSaude = await prisma.category.upsert({
        where: { slug: 'saude' },
        update: {},
        create: {
            name: 'Saúde',
            slug: 'saude',
        },
    });

    await prisma.company.upsert({
        where: { id: '70208269-8086-4f40-8456-659f81f18529' },
        update: {},
        create: {
            id: '70208269-8086-4f40-8456-659f81f18529',
            name: 'Pizzaria do Mn',
            description: 'A melhor pizza de Limoeiro do Norte, com massa artesanal e borda recheada.',
            address: 'Rua Coronel Malveira, 123',
            phone: '88999999999',
            whatsapp: '5588999999999',
            instagram: '@pizzariadomn',
            isApproved: true,
            plan: 'PREMIUM',
            userId: user.id,
            cityId: city.id,
            categoryId: catRestaurante.id,
        },
    });

    await prisma.company.upsert({
        where: { id: 'a5c6d36e-5f93-4a64-9b8e-3d7f45c26b1a' },
        update: {},
        create: {
            id: 'a5c6d36e-5f93-4a64-9b8e-3d7f45c26b1a',
            name: 'Clínica Saúde Total',
            description: 'Atendimento humanizado e diversas especialidades para cuidar de você.',
            address: 'Av. Dom Aureliano Matos, 456',
            phone: '8834230000',
            whatsapp: '5588988887777',
            isApproved: true,
            plan: 'PRO',
            userId: user.id,
            cityId: city.id,
            categoryId: catSaude.id,
        },
    });

    console.log('✅ Seed completo: Usuário, Cidade, Categorias e Empresas criadas!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });