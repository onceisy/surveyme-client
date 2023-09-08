import "../styles/globals.css";
import '@/styles/antd.scss'
import { nanoid } from 'nanoid';
import type { AppProps } from "next/app";
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!localStorage.getItem('userId')) {
        localStorage.setItem('userId', nanoid());
      }
    }
  }, []);
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
