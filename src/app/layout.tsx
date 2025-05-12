import type { Metadata } from "next";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Blog | Unitellas International Limited",
  description: "The Offical Unitellas Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased w-full overflow-x-hidden`}>
        <GoogleTagManager gtmId="GTM-MRB2FRFG" />
        {children}
      </body>
    </html>
  );
}
