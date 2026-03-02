export interface Category {
    id: string;
    name: string;
    slug: string;
}

export interface City {
    id: string;
    name: string;
    slug: string;
}

export interface CompanyImage {
    id: string;
    imageUrl: string;
    companyId: string;
}

export interface Company {
    id: string;
    name: string;
    description?: string;
    address?: string;
    street: string;
    number: string;
    neighborhood: string;
    city_name: string;
    state: string;
    phone: string;
    whatsapp?: string;
    instagram?: string;
    openingHours?: string;
    logoUrl?: string;
    plan: 'FREE' | 'PRO' | 'PREMIUM';
    categoryId: string;
    category: Category;
    cityId: string;
    city: City;
    isApproved: boolean;
    images?: CompanyImage[];
}