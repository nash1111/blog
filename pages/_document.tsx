import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png?v=2" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png?v=2" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png?v=2" />
      <link rel="manifest" href="/favicons/site.webmanifest?v=2" />
      <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg?v=2" color="#5bbad5" />
      <link rel="shortcut icon" href="/favicons/favicon.ico?v=2" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="msapplication-config" content="/favicons/browserconfig.xml?v=2" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="description" content="blog of nash1111.github.com" />
      <meta name="title" content="nash1111.github.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
