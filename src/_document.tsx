/* eslint-disable @next/next/no-document-import-in-page */
/* eslint-disable @next/next/no-page-custom-font */

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
        />

        <meta
          name="description"
          content="A blog sharing the latest industry insights and resources on cloud computing, edge technology, and digital transformation from Unitellas Edge Cloud."
        />
        <meta
          name="keywords"
          content="Unitellas blog, edge cloud, cloud computing, Africa tech, digital transformation, managed services"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/images/unitellasicon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/images/unitellasicon.png"
        />
        <link
          rel="icon"
          sizes="192x192"
          type="image/png"
          href="/assets/images/unitellasicon.png"
        />
        <link
          rel="icon"
          sizes="512x512"
          type="image/png"
          href="/assets/images/unitellasicon.png"
        />
        <meta
          name="apple-mobile-web-app-title"
          content="The official Unitellas Blog - Insights and Resources on Edge Cloud and more"
        />
        <link
          rel="apple-touch-icon"
          type="image/png"
          href="/assets/images/unitellasicon.png"
        />
        <meta
          name="msapplication-square310x310logo"
          content="/assets/images/unitellasicon.png"
        />

        {/* open graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Unitellas Blog" />
        <meta
          property="og:title"
          content="The official Unitellas Blog - Insights and Resources on Edge Cloud and more"
          key="title"
        />
        <meta
          property="og:description"
          content="Insights and updates from Africa’s first hyperscale edge cloud platform."
        />
        <meta
          property="og:image"
          content="https://blog.unitellas.com.ng/assets/images/unitellasicon.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Unitellas Logo" />
        <meta
          property="og:image:secure_url"
          content="https://blog.unitellas.com.ng/assets/images/unitellasicon.png"
        />
        <meta property="og:url" content="https://blog.unitellas.com.ng/" />

        {/* twitter cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Unitellasil" />
        <meta name="twitter:creator" content="@Unitellasil" />
        <meta
          name="twitter:title"
          content="Unitellas Blog - Africa’s Edge Cloud Voice"
        />
        <meta
          name="twitter:description"
          content="Stay up-to-date with expert articles and news on edge cloud computing and digital infrastructure in Africa."
        />
        <meta
          name="twitter:image"
          content="https://blog.unitellas.com.ng/assets/images/unitellasicon.png"
        />
        <meta name="twitter:image:alt" content="Unitellas Logo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1f2937" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
