import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../theme/GlobalStyles'
import { theme } from '../theme/MainTheme';

const MainTemplate = ({ children }) => (
  <div>
    <GlobalStyles />
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </div>
);

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainTemplate;
