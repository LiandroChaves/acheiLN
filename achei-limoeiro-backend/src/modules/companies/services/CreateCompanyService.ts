import { prisma } from '../../../database';
import { CreateCompanyDTO } from '../dtos/CreateCompanyDTO';

class CreateCompanyService {
    async execute(data: CreateCompanyDTO) {
        const company = await prisma.company.create({
            data: {
                ...data,
                isApproved: false,
            },
        });

        return company;
    }
}

export { CreateCompanyService };