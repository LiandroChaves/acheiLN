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

export interface Company {
    id: string;
    name: string;
    description?: string;
    address: string;
    phone: string;
    whatsapp?: string;
    instagram?: string;
    logoUrl?: string;
    plan: 'FREE' | 'PRO' | 'PREMIUM';
    categoryId: string;
    category: Category;
    cityId: string;
    city: City;
    isApproved: boolean;
}