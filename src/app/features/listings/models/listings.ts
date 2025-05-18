import { ICategory } from "../../../core/models/categories";
import { IDatabaseUser } from "../../../core/models/user";

export interface IListing {
    listingId: number;
    userId: number;
    categoryId: number;
    name: string;
    price: number;
    description?: string;
    blobUrls?: string[];
}

export interface IListingWithDetails extends IListing {
    user: IDatabaseUser;
    category: ICategory;
}

export interface ICreateListingRequest {
    userId: number;
    name: string;
    categoryId: number;
    price: number;
    description: string;
    filePaths?: string[];
}

export interface ICreateListingResponse {
    listingId: number;
    categoryId: number;
    name: string;
    price: number;
    description: string;
}

export interface ICreateListingFormDetails {
    name: string;
    category: number;
    price: number;
    description: string;
    filePaths?: string[];
}