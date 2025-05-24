export interface Review {
    value: number;
    comment: string;
}

export interface CreateReviewRequest {
    userId: string;
    listingId: string;
    value: number;
    comment: string;
}