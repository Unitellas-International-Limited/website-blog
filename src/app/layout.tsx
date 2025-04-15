import type { Metadata } from "next";
import "./globals.css";

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
      <body className={`antialiased w-full overflow-x-hidden`}>{children}</body>
    </html>
  );
}
