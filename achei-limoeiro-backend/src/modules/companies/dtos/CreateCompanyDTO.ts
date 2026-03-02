export interface CreateCompanyDTO {
    name: string;
    description?: string;
    street: string;
    number: string;
    neighborhood: string;
    city_name: string;
    state: string;
    phone: string;
    whatsapp?: string;
    instagram?: string;
    openingHours?: string;
    userId: string;
    cityId: string;
    categoryId: string;
}
