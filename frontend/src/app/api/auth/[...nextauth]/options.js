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
      bcrypt.compare(credentials.password, user.password)
      // user.password === credentials.password
    ) {
      return { id: user._id, name: user.username };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error authenticating user:", error);
    return null;
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
        },
      },
      async authorize(credentials) {
        const user = await authorizeDB(credentials);

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {},
  secret: process.env.NEXTAUTH_SECRET,
};
