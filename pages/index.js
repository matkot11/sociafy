import { useEffect } from "react";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth");
  }, [router]);
  return (
    <>
      <h1>Home Page</h1>
    </>
  );
};

export default HomePage;
