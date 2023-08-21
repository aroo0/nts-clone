import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Arimo, Lato, Open_Sans, Roboto_Condensed } from "next/font/google";
import Providers from "@/components/Providers";

const arimo = Arimo({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "NTS Clone",
  description: "Listen to the NTS music.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={arimo.className}>
          <Header />
          {children}
        </body>
      </Providers>
    </html>
  );
}
