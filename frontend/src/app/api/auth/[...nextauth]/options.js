import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToMongoDB, closeMongoDBConnection } from "@/mongodb/connect";
import bcrypt from "bcryptjs";
import { redirect } from "next/dist/server/api-utils";

async function authorizeDB(credentials) {
  try {
    const db = await connectToMongoDB();
    const user = await db.collection("Users").findOne({
      email: credentials.email,
    });
    if (
      await bcrypt.compare(credentials.password, user.password)
      // user.password === credentials.password
    ) {
      return { id: user._id, name: user.username, 
        email: user.email, authenticated: true };
    } else {
      throw new Error("Invalid password");
    }
  } catch (error) {
    throw new Error("Error authenticating user:", error);
  }
}

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
          required: true,
        },
      },
      async authorize(credentials) {
        const user = await authorizeDB(credentials);

        if (user.authenticated === true) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email; // ✅ Add email to session
      }
      return session;
    },
  },
  pages: {},
  secret: process.env.NEXTAUTH_SECRET,
};
