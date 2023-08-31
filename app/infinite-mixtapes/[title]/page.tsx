"use client";

import { API_PATH, API_URL } from "@/const/api";
import { Mixtape } from "@/types/mixtapes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-hot-toast";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Link from "next/link";
import { IoPlaySharp, IoStopSharp } from "react-icons/io5";

interface MixTapePageItemProps {
  params: {
    title: string;
  };
}

const MixTapePageItem = ({ params }: MixTapePageItemProps) => {
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["one-mixtape-query"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${API_URL}/${API_PATH.MIXTAPES}/${params.title}`,
      );
      return data as Mixtape;
    },
    onError: (err: any) => {
      return toast.error("Something went wrong. Try again later.");
    },
  });

  if (isLoading) return <div>Loading</div>;

  if (!data) return <div>Sth went wrong. Try again later.</div>;

  console.log(data);

  return (
    <div className="relative h-full w-full lg:bg-white">
      <div className="absolute top-[60vh] z-[5] mx-5 flex flex-col gap-3 bg-white p-8 pb-10 text-black lg:right-0 lg:top-0 lg:mx-0 lg:w-[374px]">
        <div className="flex gap-2 border-b border-black pb-4">
          <Image
            src={data.media.icon_black}
            alt="mixtape icon"
            width="40"
            height="40"
            className="mt-[3px] aspect-square h-[25px] w-[25px]"
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold  uppercase leading-tight	">
              {data.title}
            </h1>
            <p className="uppercase leading-tight">Inifite mixtapes</p>
          </div>
        </div>
        <h2 className="font-bold">{data.subtitle}</h2>
        <p>{data.description}</p>
        <Collapsible.Root
          open={open}
          onOpenChange={setOpen}
          className="border-y border-black bg-white py-4 pr-5"
        >
          <Collapsible.Trigger className="flex w-full items-center justify-between">
            <div className="font-extrabold uppercase">Credits</div>
            {open ? <AiOutlineMinus size={18} /> : <AiOutlinePlus size={18} />}
          </Collapsible.Trigger>
          <Collapsible.Content>
            <ul className="my-6">
              {data.credits.map((entry) => (
                <li className="font-extrabold uppercase leading-9	">
                  {entry.name}
                </li>
              ))}
            </ul>
          </Collapsible.Content>
        </Collapsible.Root>
        <Link
          href="/infinite-mixtapes"
          className="self-end py-2 font-extrabold uppercase"
        >
          More Mixtapes
        </Link>
      </div>

      <div className="absolute top-0 h-full overflow-hidden bg-black before:absolute before:bottom-0	before:h-1/4 before:w-full before:bg-gradient-to-t before:from-black before:content-[''] lg:fixed lg:right-[374px] lg:before:hidden">
        <video
          autoPlay
          loop
          controls={false}
          muted
          width="1600"
          height="auto"
          className="h-full w-full object-cover"
          poster={data.media.animation_thumb}
        >
          <source
            src={data?.media.animation_large_landscape}
            type="video/mp4"
          />
          {/* Add additional <source> elements for other video formats if needed */}
        </video>
        <button className="absolute top-0 w-full h-full flex aspect-square items-center justify-center text-white  ">
          <IoPlaySharp size={60} className="h-[100px] w-[100px]" />
        </button>
      </div>
    </div>
  );
};

export default MixTapePageItem;
