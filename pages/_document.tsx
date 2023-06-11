import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8587845092292315"
          crossOrigin="anonymous"></script>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png?v=2" />
        <link rel="manifest" href="/favicons/site.webmanifest?v=2" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg?v=2" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicons/favicon.ico?v=2" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-config" content="/favicons/browserconfig.xml?v=2" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="tech blog of nash1111" />
        <meta name="title" content="nash1111 tech blog" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
