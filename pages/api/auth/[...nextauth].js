import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { connectToDataBase } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialProvider({
      async authorize(credentials) {
        const client = await connectToDataBase();

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
