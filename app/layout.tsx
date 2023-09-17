import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import QueryProvider from "@/providers/QueryProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import MixtapeRadio from "@/components/MixtapeRadio";
import EpisodeRadio from "@/components/EpisodeRadio";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

const arimo = Arimo({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "NTS Clone",
  description: "Listen to the NTS music.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className={arimo.className}>
      <QueryProvider>
        <body className="overflow-y-scroll">
          <ToasterProvider />
          <Header />

          <main className="box-border h-full  w-full pb-4 pt-[110px] lg:pt-[78px]">
            {children}
          </main>

          <MixtapeRadio />
          <EpisodeRadio />
        </body>
      </QueryProvider>
    </html>
  );
}
