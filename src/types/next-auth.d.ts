import "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        role: string;
        isMember: boolean;
    }

    interface Session {
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
            isMember: boolean;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: string;
        isMember: boolean;
    }
}
