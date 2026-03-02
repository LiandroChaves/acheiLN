import { prisma } from '../../../database';
import { UpdateCompanyDTO } from '../dtos/UpdateCompanyDTO';

class UpdateCompanyService {
    async execute(id: string, userId: string, data: UpdateCompanyDTO) {
        const company = await prisma.company.findFirst({
            where: { id, userId }
        });

        if (!company) {
            throw new Error('Empresa não encontrada ou você não tem permissão para editá-la.');
        }

        const updatedCompany = await prisma.company.update({
            where: { id },
            data
        });

        return updatedCompany;
    }
}

export { UpdateCompanyService };