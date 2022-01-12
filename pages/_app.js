import "../styles/fonts.css";
import { SessionProvider } from "next-auth/react";
import AppProviders from "../providers/AppProviders";

function MyApp({ Component, pageProps }) {
  return (
    <AppProviders>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </AppProviders>
  );
}

export default MyApp;
