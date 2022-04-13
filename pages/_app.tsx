import "@assets/main.css";
import "antd/dist/antd.css";

import { FC } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

const InitialLayout: FC = ({ children }) => <>{children}</>;

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || InitialLayout;

  return (
    <QueryClientProvider client={queryClient}>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default MyApp;
