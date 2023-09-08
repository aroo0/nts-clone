"use client";
import { ChannelStation } from "@/types/shows";
import { twMerge } from "tailwind-merge";
import { useFormattedTimeRange } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import usePlayer from "@/stores/usePlayer";
import { toggleRadioParams } from "@/types/general";
import { PhCaretRightBold, PhPlayFill, PhStopFill } from "./Icons";

interface RadioStationDescriptionProps {
  station?: ChannelStation;
  stationName: string;
  isLoading: boolean;
  toggleRadio: (params: toggleRadioParams) => void;
}

const RadioStationDescription: React.FC<RadioStationDescriptionProps> = ({
  station,
  isLoading,
  stationName,
  toggleRadio,
}) => {
  const { activePlayer } = usePlayer();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (activePlayer?.stationName === stationName) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [activePlayer]);

  if (!station || isLoading) {
    return;
  }

  const detailsInfo = station?.now.embeds.details;

  const currentAuditionDurationRange = useFormattedTimeRange(
    station?.now.start_timestamp,
    station?.now.end_timestamp,
  );

  const nextAuditionDurationRange = useFormattedTimeRange(
    station?.next.start_timestamp,
    station?.next.end_timestamp,
  );

  return (
    <div className="relative border-b border-white lg:border-b-0 lg:first:border-r">
      <div className={twMerge(isPlaying && "bg-white")}>
        <div className="z-[2] grid w-full grid-cols-2 justify-between p-3 lg:absolute">
          <div className="flex items-center gap-2">
            <div
              className={twMerge(
                `flex h-[20px] w-[20px] items-center justify-center bg-white text-sm font-extrabold text-black`,
                isPlaying && "bg-black text-white lg:bg-white lg:text-black",
              )}
            >
              {station?.channel_name}
            </div>
            <div className=" pulse-opacity mx-1 h-1.5 w-1.5 rounded-full bg-red-500" />
            {detailsInfo?.brand.title && (
              <>
                <p
                  className={twMerge(
                    "truncate text-xs font-bold uppercase lg:col-span-5 ",
                    isPlaying && "text-black lg:text-white",
                  )}
                >
                  {detailsInfo?.brand.title}
                </p>
                <span>•</span>
              </>
            )}

            <p
              className={twMerge(
                "mr-2 truncate text-xs uppercase lg:col-span-5 ",
                isPlaying && "text-black lg:text-white",
              )}
            >
              {detailsInfo?.location_long}
            </p>
          </div>
          <div
            className={twMerge(
              "justify-self-end pl-4 text-xs font-extrabold lg:justify-self-auto lg:text-sm lg:font-normal",
              isPlaying && "text-black",
            )}
          >
            {currentAuditionDurationRange}
          </div>
        </div>
        <div className="grid w-full grid-cols-2">
          <div
            className={twMerge(
              "group relative mx-3 mb-5  box-border aspect-[2/1] cursor-pointer  pr-10 lg:m-0 lg:aspect-[3/2]",
              isPlaying && "",
            )}
            onClick={() =>
              toggleRadio({ stationName: stationName, type: "radio" })
            }
          >
            <Image
              src={detailsInfo.media.picture_medium_large}
              className="object-cover brightness-75 transition group-hover:brightness-50"
              fill
              sizes="800px 800px"
              alt="cover image"
            />
            <div
              className={twMerge(
                "absolute bottom-0 bg-white px-1 py-2 text-black lg:bottom-3 lg:left-4 lg:bg-transparent lg:text-white",
                isPlaying && "bg-transparent text-white",
              )}
            >
              {isPlaying ? (
                <PhStopFill className=" h-7 w-7 lg:h-16 lg:w-16" />
              ) : (
                <PhPlayFill className=" h-7 w-7 lg:h-16 lg:w-16" />
              )}
            </div>
          </div>
          <div
            className={twMerge(
              "flex flex-col gap-3 pl-4 pr-8 md:pr-14 lg:pt-9",
              isPlaying && "bg-white",
            )}
          >
            <div
              className={twMerge(
                "line-clamp-2 text-xs font-extrabold uppercase sm:line-clamp-2 sm:text-sm lg:text-xl",
                isPlaying && "text-black",
              )}
            >
              {detailsInfo.name}
            </div>
            <div
              className={twMerge(
                "line-clamp-1 text-xs sm:text-sm md:line-clamp-3",
                isPlaying && "text-black",
              )}
            >
              {detailsInfo.description}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden border-y border-white lg:flex">
        <div className="border-r border-white ">
          <Link href={"/"} className="flex items-center gap-2 p-3 ">
            <span className=" whitespace-nowrap text-sm font-extrabold uppercase	">
              Next on{" "}
            </span>
            <PhCaretRightBold className="h-3 w-3" />
          </Link>
        </div>
        <div className="flex items-center gap-2 p-3">
          <div className="whitespace-nowrap pl-2 text-sm	">
            {nextAuditionDurationRange}
          </div>
          <div className="line-clamp-1 pr-2 text-sm font-extrabold uppercase">
            {station.next.embeds.details.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioStationDescription;
