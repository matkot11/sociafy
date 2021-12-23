import "../styles/fonts.css";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import { GlobalStyle } from "../styles/GlobalStyle";
import { ErrorProvider } from "../hooks/useError";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ErrorProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </ErrorProvider>
    </ThemeProvider>
  );
}

export default MyApp;
