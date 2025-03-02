import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Load custom fonts
const sourceSerif = localFont({
  src: "./fonts/SourceSerif4-VariableFont_opsz,wght.ttf",
  variable: "--font-source-serif",
  weight: "300 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const parkinsans = localFont({
  src: "./fonts/Parkinsans-VariableFont_wght.ttf",
  variable: "--font-parkinsans",
  weight: "300 900",
});

// Metadata for the document
export const metadata: Metadata = {
  title: "Estación Meteorologica Virtual",
  description: "Generated by create next app",
};

// Root layout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sourceSerif.variable} ${geistMono.variable} ${parkinsans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
