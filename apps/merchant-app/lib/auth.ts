import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import db from "@repo/db/client";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn(params) {
      const { user, account } = params;
      console.log("hi signin");

      if (!user || !user.email || !account) {
        return false;
      }

      const email = user.email || "";
      const name = user.name || "";

      await db.merchant.upsert({
        select: {
          id: true,
        },
        where: {
          email: email,
        },
        create: {
          email: email,
          name: name,
          auth_type: account.provider === "google" ? "Google" : "Github", // Ensure this matches your schema
        },
        update: {
          name: name,
          auth_type: account.provider === "google" ? "Google" : "Github", // Ensure this matches your schema
        },
      });

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
};
