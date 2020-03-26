import Head from "next/head";
import GlobalStyles from "../components/GlobalStyles";

export default ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>YouTube - collect anonymous feedback</title>
      </Head>
      <GlobalStyles>
        <Component {...pageProps} />
      </GlobalStyles>
    </>
  );
};
