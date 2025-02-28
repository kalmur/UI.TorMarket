export interface IProduct {
    listingId: number;
    userId: number;
    categoryId: number;
    name: string;
    sellLease: number;
    description?: string; 
    price: number;
    city: string;
    country: string;
    availableFrom?: Date;
    rating: number;
}

export interface IProductFormDetails {
    name: string;
    category: string;
    price: number;
    availableFrom: Date;
    description: string;
    imageUrl: string;
}