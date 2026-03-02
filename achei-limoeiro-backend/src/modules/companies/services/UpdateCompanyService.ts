import { prisma } from '../../../database';
import { UpdateCompanyDTO } from '../dtos/UpdateCompanyDTO';

class UpdateCompanyService {
    async execute(id: string, userId: string, userRole: string, data: UpdateCompanyDTO) {
        // Se for ADMIN, ignora o filtro de userId
        const where = userRole === 'ADMIN' ? { id } : { id, userId };

        const company = await prisma.company.findFirst({
            where
        });

        if (!company) {
            throw new Error('Empresa não encontrada ou você não tem permissão para editá-la, mn.');
        }

        const updatedCompany = await prisma.company.update({
            where: { id },
            data
        });

        return updatedCompany;
    }
}

export { UpdateCompanyService };