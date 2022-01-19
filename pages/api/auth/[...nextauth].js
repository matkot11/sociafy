import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { MongoClient } from "mongodb";

export default NextAuth({
  session: {
    strategy: "jwt",
    secret: process.env.JWT_SECRET,
  },
  secret: process.env.JWT_SECRET,
  callbacks: {
    async session({ session }) {
      const client = await MongoClient.connect(process.env.MONGODBAPI);

      const usersCollection = await client.db().collection("users");

      const currentUser = await usersCollection.findOne({
        email: session.user.email,
      });

      if (!currentUser) {
        await client.close();
        throw new Error("No user found!");
      }
      session.user = {
        email: currentUser.email,
        id: currentUser._id.toString(),
      };

      return session;
    },
  },
  providers: [
    CredentialProvider({
      async authorize(credentials) {
        const client = await MongoClient.connect(process.env.MONGODBAPI);

        const usersCollection = await client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          await client.close();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password,
        );

        if (!isValid) {
          throw new Error("Could not log you in!");
        }

        await client.close();

        return {
          email: user.email,
          id: user._id.toString(),
        };
      },
    }),
  ],
});
