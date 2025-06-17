import { ListingWithDetails } from "../../features/listings/models/listings";

export interface PaginatedRequest {
    pageSize: number;
    pageIndex: number;
    sortColumn?: string;
    sortAscending?: boolean;
}

export interface PaginatedResponse<T> {
    pageSize: number;
    pageIndex: number;
    totalItemCount: number;
    maximumPageSize: number;
    sortColumn: string;
    sortAscending: boolean;
    sortableColumns: string[];
    items: T[];
}

export type ListingWithDetailsResponse = PaginatedResponse<ListingWithDetails>;