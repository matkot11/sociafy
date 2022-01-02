import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { MongoClient } from "mongodb";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialProvider({
      async authorize(credentials) {
        const client = await MongoClient.connect(process.env.MONGODBAPI);

        const usersCollection = client.db().collection("users");

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
        };
      },
    }),
  ],
});
