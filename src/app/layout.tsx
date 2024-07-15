import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import "./custom.scss";
import TopBar from "./components/topbar/topbar";
import Privoder from "./privoder";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SUPCON SCM",
  description: "Supcon scm app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width"></meta>
      </head>
      <body className={inter.className}>
        <TopBar></TopBar>
        <Privoder>
          <div className="container">{children}</div>
        </Privoder>
      </body>
    </html>
  );
}
