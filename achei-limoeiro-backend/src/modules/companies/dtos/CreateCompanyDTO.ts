export interface CreateCompanyDTO {
    name: string;
    description?: string;
    address: string;
    phone: string;
    whatsapp?: string;
    instagram?: string;
    openingHours?: string;
    userId: string;
    cityId: string;
    categoryId: string;
}
