import { useEffect, useState } from "react";
import "../styles/fonts.css";
import { SessionProvider, getSession } from "next-auth/react";
import AppProviders from "../providers/AppProviders";
import { useRouter } from "next/router";
import LoadingComments from "../components/organisms/LoadingComments/LoadingComments";
import App from "next/app";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setIsLoading(true) : setIsLoading(false);
    };
    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <AppProviders>
      <SessionProvider session={pageProps.session}>
        {isLoading ? <LoadingComments /> : <Component {...pageProps} />}
      </SessionProvider>
    </AppProviders>
  );
}

MyApp.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context);
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    ...appProps,
  };
};

export default MyApp;
