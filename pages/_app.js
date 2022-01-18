import { useEffect, useState } from "react";
import "../styles/fonts.css";
import { SessionProvider } from "next-auth/react";
import AppProviders from "../providers/AppProviders";
import { useRouter } from "next/router";
import Loading from "../components/organisms/Loading/Loading";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = (url) => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  if (loading) {
    return (
      <AppProviders>
        <SessionProvider session={pageProps.session}>
          <Loading />
        </SessionProvider>
      </AppProviders>
    );
  }

  return (
    <AppProviders>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </AppProviders>
  );
}

export default MyApp;
