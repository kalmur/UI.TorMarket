export interface DatabaseUser {
    userId: number;
    providerId: string;
    roleId: number;
}

export interface IdentityProviderUser {
    id: number;
    name: string;
    email: string;
    picture: string;
}

export interface CreateUserRequest {
    roleId: number;
    providerId: string;
}