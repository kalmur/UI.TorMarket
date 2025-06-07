export interface DatabaseUser {
    userId: number;
    providerId: string;
    roleId: number;
}

export interface SiteUser {
    id: number;
    name: string;
    email: string;
    picture: string;
}