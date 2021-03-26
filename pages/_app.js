import MainTemplate from '../templates/MainTemplate';

function MyApp({ Component, pageProps }) {
  return (
    <MainTemplate>
      <Component {...pageProps} />
    </MainTemplate>
  );
}

export default MyApp;
