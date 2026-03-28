import NextAuth from "next-auth";

declare module 'next-auth' {
    interface Session {
        apiAccessToken?: string;
        user: {
            id: string;
            name: string;
            email: string;
            image?: string;
            address?: string | null;
            phone?: string | null;
            password: string;
        }
    }
    interface User {
        id: string;
        apiAccessToken?: string;
    }
}



declare module 'next-auth/jwt' {
    interface JWT {
        userId: string;
        apiAccessToken?: string;
    }
}