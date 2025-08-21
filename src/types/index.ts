export interface Product {
    id: string;
    sku: string;
    name: string;
    price: number;
    imageUrl: string;
    description?: string | null;
    category: string;
}