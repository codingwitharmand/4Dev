import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";
import { db } from "@/app/lib/db";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt", 
    },
    pages: {
        signIn: '/'
    },
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: parseInt(process.env.EMAIL_SERVER_PORT as string, 10),
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
            maxAge: 6 * 60 * 60,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    // Add the ID to the token and session
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.id && typeof token.id === 'string') {
                session.user.id = token.id;
            }
            return session;
        },
    },
};