import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToMongoDB, closeMongoDBConnection } from "@/mongodb/connect";

async function authorizeDB(credentials) {
  try {
    const db = await connectToMongoDB();
    const user = await db.collection("Users").findOne({
      username: credentials.username,
      password: credentials.password,
    });
    if (
      user.username === credentials.username &&
      user.password === credentials.password
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
        username: { label: "Username", type: "text", placeholder: "username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        // const user = { id: 1, name: "Test User", password: "password" };
        // if (
        //   credentials.username === user.name &&
        //   credentials.password === user.password
        // ) {
        //   return user;
        // } else {
        //   return null;
        // }
        const user = await authorizeDB(credentials);

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    // signIn: "/auth/signin",
    // signOut: "/auth/signout",
    // error: "/auth/error",
    // verifyRequest: "/auth/verify-request",
    // newUser: "/auth/new-user",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
