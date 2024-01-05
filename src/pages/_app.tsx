import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ThemeContextProvider } from "~/context/ThemeProvider";
import MainLayoutContainer from "~/containers/layout/mainLayoutContainer";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <ThemeContextProvider>
    <MainLayoutContainer>
      <Component {...pageProps} />
    </MainLayoutContainer>
  </ThemeContextProvider>;
};

export default api.withTRPC(MyApp);
