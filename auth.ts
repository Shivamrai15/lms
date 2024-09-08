import NextAuth from "next-auth"
import { Role } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/lib/user";

export const {
    handlers,
    signIn,
    signOut,
    auth
} = NextAuth({
    pages: {
        signIn: "/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }){
        if (account?.provider !== "credentials") return true;
            return true;
        },

        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as Role;
            }
            return session;
        },
        async jwt({ token }) {
        if (!token.sub) return token;
            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;
            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});