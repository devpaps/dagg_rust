import type { AppProps } from "next/app";
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme/customTheme';

// import "../style.css";
// import "../App.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS={true} theme={theme}>
      <Component {...pageProps} />;
    </ChakraProvider>
  )
}
