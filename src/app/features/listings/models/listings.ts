export interface IListing {
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

export interface IListingFormDetails {
    name: string;
    category: string;
    price: number;
    availableFrom: Date;
    description: string;
    imageUrl: string;
}

export interface ICreateListingRequest {
    userId: number;
    name: string;
    categoryId: number;
    price: number;
    availableFrom: Date;
    description: string;
}

export interface ICreatedListing {
    productId: number;
    categoryId: number;
    name: string;
    price: number;
    description: string;
    availableFrom: Date;
}