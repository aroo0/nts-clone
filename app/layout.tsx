import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import Providers from "@/components/Providers";
import ToasterProvider from "@/components/ToasterProvider";
import MixtapeRadio from "@/components/MixtapeRadio";

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
        <body className='overflow-y-scroll' >
          <ToasterProvider />
          <Header />
          <main className="box-border pt-[110px] lg:pt-[78px]  h-full w-full">
            {children}
          </main>
          <MixtapeRadio />
          {/* TODO: <EpisodeRadio /> */}
        </body>
      </Providers>
    </html>
  );
}
