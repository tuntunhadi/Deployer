import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="description" content="Git client for mobile developers" />
        <title>GitWeb - Git Client for Mobile</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
