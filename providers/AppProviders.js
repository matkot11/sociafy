import { ThemeProvider } from "styled-components";
import { ErrorProvider } from "../hooks/useError";
import { GlobalStyle } from "../styles/GlobalStyle";
import { theme } from "../styles/theme";

const AppProviders = ({ children }) => (
  <ThemeProvider theme={theme}>
    <ErrorProvider>
      <GlobalStyle />
      {children}
    </ErrorProvider>
  </ThemeProvider>
);

export default AppProviders;
