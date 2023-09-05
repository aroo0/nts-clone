import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import Providers from "@/components/Providers";
import ToasterProvider from "@/components/ToasterProvider";
import MixtapeRadio from "@/components/MixtapeRadio";
import EpisodeRadio from "@/components/EpisodeRadio";

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
    <html lang="en" className={arimo.className}>
      <Providers>
        <body className="overflow-y-scroll">
          <ToasterProvider />
          <Header />
          <main className="box-border h-full w-full  pt-[110px] lg:pt-[78px]">
            {children}
          </main>
          <MixtapeRadio />
          <EpisodeRadio />
        </body>
      </Providers>
    </html>
  );
}
