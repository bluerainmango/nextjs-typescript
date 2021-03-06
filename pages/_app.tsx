import { AppProps } from "next/app";
import { FC } from "react";
import { UIProvider, useUI } from "@components/ui/context";

import "@assets/main.css";

const Noop: FC = ({ children }) => <>{children}</>;

function MyApp({
  Component,
  pageProps,
}: AppProps & { Component: { Layout: FC } }) {
  // if null or undefiend, empty comp or page comp(Home,...)
  const Layout = Component.Layout ?? Noop;
  const ui = useUI();

  return (
    <UIProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UIProvider>
  );
}

export default MyApp;
