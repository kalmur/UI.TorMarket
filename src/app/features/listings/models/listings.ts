import { Category } from "../../../core/models/categories";
import { DatabaseUser } from "../../../core/models/user";

export interface Listing {
    listingId: number;
    userId: number;
    categoryId: number;
    name: string;
    price: number;
    description?: string;
    blobUrls?: string[];
}

export interface ListingWithDetails extends Listing {
    user: DatabaseUser;
    category: Category;
}

export interface CreateListingRequest {
    userId: number;
    name: string;
    categoryId: number;
    price: number;
    description: string;
    filePaths?: string[];
}

export interface CreateListingResponse {
    listingId: number;
    categoryId: number;
    name: string;
    price: number;
    description: string;
}

export interface CreateListingFormDetails {
    name: string;
    category: number;
    price: number;
    description: string;
    filePaths?: string[];
}