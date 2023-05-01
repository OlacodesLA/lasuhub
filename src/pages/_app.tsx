import '@/styles/globals.css'
import type { FC } from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
const router = useRouter()
  return(
  <AnimatePresence mode="wait" >
  <SessionProvider session={pageProps.session}>
    <Component {...pageProps} key={router.asPath} />
  </SessionProvider>
  </AnimatePresence>
  )
  };

export default MyApp;

