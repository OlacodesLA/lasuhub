//@ts-nocheck
import { Html, Head, Main, NextScript } from 'next/document'
import Transition from '@/components/Transition'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans&family=Inter:wght@100;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
</Head>
      <body className='font-inter'>

        <Main />
        <NextScript />

      </body>
    </Html>
  )
}
