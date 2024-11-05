import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import Navbar from "./components/navbar";
import "./globals.scss";


const roboto = Roboto({
  subsets: ['latin'],
  weight: ["100", "300", "400", "500", "700"],
})

export const metadata: Metadata = {
  title: "Digital Sommelier",
  description: "Using AI, in the form of LLM to get wine recommendations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <>
        <Navbar />
        {children}
        </>
      </body>
    </html>
  );
}
