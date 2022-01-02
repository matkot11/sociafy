import { getSession } from "next-auth/react";

export const getAndCheckSession = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(404).json({ message: "No session" });
    return;
  }
  return session;
};
