import { useEffect, useState } from "react";
import "../styles/fonts.css";
import { SessionProvider, getSession } from "next-auth/react";
import AppProviders from "../providers/AppProviders";
import { useRouter } from "next/router";
import Loading from "../components/organisms/Loading/Loading";
import MainTemplate from "../components/templates/MainTemplate/MainTemplate";
import App from "next/app";

function MyApp({ Component, pageProps, session }) {
  const [loading, setLoading] = useState(false);
  // const session = getSession();
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

  if (!session && loading) {
    return <Loading />;
  }

  if (loading) {
    return (
      <AppProviders>
        <SessionProvider session={pageProps.session}>
          <MainTemplate userId={session.user.id}>
            <Loading />
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
  console.log(session);

  return {
    ...appProps,
    session,
  };
};

export default MyApp;
