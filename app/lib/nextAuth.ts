import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
    providers: [
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID as string,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        // }),
        Credentials({
            name: "credentials",
            credentials: {
                email: { type: "email" },
                password: { type: "password" },
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                try {
                    const loginRes = await fetch(
                        "https://api.escuelajs.co/api/v1/auth/login",
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password,
                            }),
                        }
                    );

                    if (!loginRes.ok) return null;

                    const tokens = await loginRes.json();

                    const profileRes = await fetch(
                        "https://api.escuelajs.co/api/v1/auth/profile",
                        {
                            headers: {
                                Authorization: `Bearer ${tokens.access_token}`,
                            },
                        }
                    );

                    if (!profileRes.ok) return null;

                    const user = await profileRes.json();

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        image: user.avatar,
                        apiAccessToken: tokens.access_token,
                    };
                } catch (error) {
                    console.error("Authorize error:", error);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 1 * 24 * 60 * 60,
    },

    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/register",
    },

    callbacks: {
        async jwt({ token, user, account, session, trigger }) {

            if (user) {
                token.userId = user.id;
                token.name = user.name;
                token.email = user.email;
                token.image = user.image;
                token.apiAccessToken = user.apiAccessToken;
            }

            if (trigger === "update" && session?.user) {
                token.name = session.user.name;
                token.email = session.user.email;
                token.image = session.user.image;
            }

            return token;

            // if (account?.provider === "google") {
            //     token.googleAccessToken = account.access_token;
            // }

            return token;
        },
        async session({ session, token }) {
            session.user.id = token.userId;
            session.apiAccessToken = token.apiAccessToken;
            return session;
        },

        async redirect({ baseUrl }) {
            return `${baseUrl}/profile`;
        },
    },
    events: {
        // async createUser({ user }) {
        //     await fetch("https://api.escuelajs.co/api/v1/users", {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({
        //             provider: 'google',
        //             email: user.email,
        //             name: user.name,
        //         }),
        //     });
        // }
    }
};