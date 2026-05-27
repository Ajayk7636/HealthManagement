export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    token?: string;
}

export interface AuthResponse {
    token: string;
    username: string;
    role: string;
    userId: number;
}
