import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../theme/GlobalStyles';
import { theme } from '../theme/MainTheme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </>
  ),
];
