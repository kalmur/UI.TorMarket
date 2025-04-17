export interface IListing {
    listingId: number;
    userId: number;
    categoryId: number;
    name: string;
    price: number;
    description?: string;
    availableFrom?: string;
    user: {
        userId: number;
        providerId: string;
    };
    category: {
        categoryId: number;
        name: string;
    };
}

export interface IBasicListing {
    listingId: number;
    userId: number;
    categoryId: number;
    name: string;
    price: number;
    description?: string;
    availableFrom?: string;
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

export interface ICreateListingResponse {
    productId: number;
    categoryId: number;
    name: string;
    price: number;
    description: string;
    availableFrom: Date;
}