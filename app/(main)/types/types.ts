export interface Product {
    id: number;
    title: string;
    price: number;
    originalPrice?: number;
    images: string;
}

export interface Category {
    id: number;
    name: string,
    slug: string,
    image: string,
    creationAt: string,
    updatedAt: string
}

export interface Store {
    id: number;
    name: string;
    image: string;
    description: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    password: string;
    address?: string;
    phone?: string;
}
