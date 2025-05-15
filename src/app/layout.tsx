import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";

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
