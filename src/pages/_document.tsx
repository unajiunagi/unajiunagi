import { Html, Head, Main, NextScript } from 'next/document'
import { staticPath } from 'type/$path';

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href={staticPath.favicons.apple_touch_icon_png} />
        <link rel="icon" type="image/png" sizes="32x32" href={staticPath.favicons.favicon_32x32_png} />
        <link rel="icon" type="image/png" sizes="16x16" href={staticPath.favicons.favicon_16x16_png} />
        <link rel="manifest" href={staticPath.favicons.site_webmanifest} />
        <link rel="shortcut icon" href={staticPath.favicons.favicon_ico} />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
