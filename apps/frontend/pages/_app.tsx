import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/main.scss';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>LOLDesign!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
}

export default CustomApp;
