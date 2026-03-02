export interface UpdateCompanyPlanDTO {
    companyId: string;
    plan: 'FREE' | 'PRO' | 'PREMIUM';
}