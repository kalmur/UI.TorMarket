import { Category } from "../../../core/models/categories";
import { DatabaseUser } from "../../../core/models/user";

export interface Listing {
    listingId: number;
    name: string;
    price: number;
    description?: string;
}

export interface ListingWithDetails extends Listing {
    user: DatabaseUser;
    category: Category;
    listingBlobs: ListingBlob[];
}

export interface ListingBlob {
    url: string;
    isPrimary: boolean;
}

export interface CreateListingRequest {
    userId: number;
    categoryName: string;
    title: string;
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
    title: string;
    category: number;
    price: number;
    description: string;
    filePaths?: string[];
}