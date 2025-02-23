import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Link from "next/link";
import { Linkedin, Github, Home} from 'lucide-react';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "loe's blog",
  description: "my blog about art design and things i like",
  openGraph: {
    url: "https://lolobalcker.github.io/loe-blog/",
    type: "website",
    title: "lo3's blog",
    description: "my blog about art design and things i like",
    images: [
      {
        url: "https://lolobalcker.github.io/loe-blog/docs/lain-room.jpg",
        width: 1860,
        height: 1036,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "lolobalcker.github.io/lolo-blog/", // corresponds to twitter:domain
    title: "loe's blog",
    description: "my blog about art design and things i like",
    images: ["https://lolobalcker.github.io/loe-blog/docs/lain-room.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased backgroundImage`}
      >
      <header className="flex justify-between items-center p-4 bg-blue-400 dark:bg-gray-800">
        <Link href="/">
          <h1 className="text-3xl font-bold text-black dark:text-white">
           {"loe's personal blog"}
          </h1>
        </Link>
        <nav className="flex justify-between items-center p-4 gap-4">
            <Link href="/" className="text-xl font-bold"><Home/></Link>
        </nav>
    </header>
        {children}
      </body>
    </html>
  );
}
