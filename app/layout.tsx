import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import Providers from "@/components/Providers";
import ToasterProvider from "@/components/ToasterProvider";

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
          <ToasterProvider />
          <Header />
          <main className="mt-[113px] pt-[48px] lg:mt-[79px]">
            {children}
          </main>
        </body>
      </Providers>
    </html>
  );
}
