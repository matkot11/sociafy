import { useEffect, useState } from "react";
import "../styles/fonts.css";
import { SessionProvider, getSession } from "next-auth/react";
import AppProviders from "../providers/AppProviders";
import { useRouter } from "next/router";
import LoadingComments from "../components/organisms/LoadingComments/LoadingComments";
import MainTemplate from "../components/templates/MainTemplate/MainTemplate";
import App from "next/app";

function MyApp({ Component, pageProps, session }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  if (!pageProps && loading) {
    return <LoadingComments />;
  }

  if (pageProps.session && loading) {
    return (
      <AppProviders>
        <SessionProvider session={pageProps.session}>
          <MainTemplate userId={pageProps.session.user.id}>
            <LoadingComments />
          </MainTemplate>
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
    session,
  };
};

export default MyApp;
