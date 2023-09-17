"use client";

import { API_PATH, API_URL } from "@/const/api";
import { Mixtape } from "@/types/mixtapes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-hot-toast";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import useRadioToggle from "@/hooks/useRadioToggle";
import usePlayer from "@/stores/usePlayer";
import {
  PhMinusBold,
  PhPlayFill,
  PhPlusBold,
  PhStopFill,
} from "@/components/Icons";
import Spiner from "@/components/Spiner";

interface MixTapePageItemProps {
  params: {
    title: string;
  };
}

const MixTapePageItem = ({ params }: MixTapePageItemProps) => {
  const [open, setOpen] = useState(false);
  const vidRef = useRef(null);
  const { toggleRadio } = useRadioToggle();
  const { activePlayer } = usePlayer();

  const [isPlaying, setIsPlaying] = useState(false);

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

  useEffect(() => {
    if (
      activePlayer?.stationName === data?.mixtape_alias &&
      activePlayer.pause === false
    ) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [activePlayer, data]);

  useEffect(() => {
    if (!vidRef || !vidRef.current) {
      return;
    }

    if (activePlayer?.stationName === data?.mixtape_alias) {
      if (activePlayer.pause) {
        (vidRef.current! as HTMLVideoElement).pause();
      } else {
        (vidRef.current! as HTMLVideoElement).play();
      }
    }
  }, [activePlayer, vidRef]);

  if (isLoading) return <div>Loading</div>;

  if (!data) return <div>Sth went wrong. Try again later.</div>;

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
            {open ? (
              <PhMinusBold className="h-[16px] w-[16px] fill-black" />
            ) : (
              <PhPlusBold className="h-[16px] w-[16px] fill-black" />
            )}
          </Collapsible.Trigger>
          <Collapsible.Content>
            <ul className="my-6">
              {data.credits.map((entry) => (
                <li
                  className="font-extrabold uppercase leading-9	"
                  key={entry.path}
                >
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
        {activePlayer?.stationName === data?.mixtape_alias ? (
          <video
            autoPlay
            loop
            controls={false}
            muted
            width="1600"
            height="auto"
            className="h-full w-full object-cover"
            poster={data.media.animation_thumb}
            src={data?.media.animation_large_landscape}
            ref={vidRef}
          ></video>
        ) : (
          <Image
            src={data.media.picture_large}
            className="h-full w-full object-cover"
            width="900"
            height="300"
            alt="Poster Image"
          />
        )}

        <button
          className="absolute top-0 flex aspect-square h-full w-full items-center justify-center text-white"
          onClick={() => {
            toggleRadio({
              stationName: data.mixtape_alias,
              type: "mixtape",
              source: data.audio_stream_endpoint,
              info: {
                image: data.media.picture_small,
                animation: data.media.animation_thumb,
                subtitle: data.subtitle,
              },
            });
          }}
        >
          {isPlaying ? (
              activePlayer.isLoadingAudio === "unloaded" ? (
                <Spiner size="h-[100px] w-[100px]" color="text-white" />
              ) : (
                <PhStopFill className="h-[100px] w-[100px] " />
              )
            )  : (
            <PhPlayFill className="h-[100px] w-[100px] fill-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default MixTapePageItem;
