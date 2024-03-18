declare global {
    interface TokenPayload {
        userId: string;
        exp: number;
    }

    interface LoginCredentials {
        email: string;
        password: string;
    }

    interface User {
        accessToken: string | null;
    }
}
export { }

