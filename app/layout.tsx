import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NavBar } from "./components";
import "./globals.css";
import AppProvider from "./providers/AppProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DAO App",
  description: "Decentralized Autonomous Organization",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <NavBar />
          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
