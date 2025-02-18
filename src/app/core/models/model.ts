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

export interface IApiResponseModel {
    message: string,
    result: boolean,
    data: any
}