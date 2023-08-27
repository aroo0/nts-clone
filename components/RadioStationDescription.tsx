"use client"
import { Show } from "@/types/live";
import { twMerge } from "tailwind-merge";
import { useFormattedTimeRange } from "@/lib/utils";
import Image from "next/image";
import { IoPlaySharp, IoStopSharp } from "react-icons/io5";
import { PiCaretRightBold } from "react-icons/pi";
import Link from "next/link";
import { useEffect, useState } from "react";
import usePlayer from "@/stores/usePlayer";

interface RadioStationDescriptionProps {
  station?: Show;
  stationName: string;
  isLoading: boolean;
  toggleRadio: (stationName: string) => void;

}

const RadioStationDescription: React.FC<RadioStationDescriptionProps> = ({
  station,
  isLoading,
  stationName,
  toggleRadio
}) => {
   const { activePlayer } = usePlayer();
   const [isPlaying, setIsPlaying] = useState(false);
 
   useEffect(() => {
     if (activePlayer === stationName) {
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
    station?.now.end_timestamp
  );

  const nextAuditionDurationRange = useFormattedTimeRange(
    station?.next.start_timestamp,
    station?.next.end_timestamp
  );

  return (
    <div className="relative lg:first:border-r border-b lg:border-b-0 border-white">
      <div className={twMerge(isPlaying && "bg-white")}>
        <div className="lg:absolute grid grid-cols-2 w-full justify-between z-[2] p-3">
          <div className="flex gap-2 items-center">
            <div
              className={twMerge(
                `h-[20px] w-[20px] flex justify-center items-center text-black bg-white font-extrabold text-sm`,
                isPlaying && "bg-black text-white lg:bg-white lg:text-black"
              )}
            >
              {station?.channel_name}
            </div>
            <div className=" bg-red-500 w-1.5 h-1.5 rounded-full pulse-opacity mx-1" />
            {detailsInfo?.brand.title && (
              <>
                <p
                  className={twMerge(
                    "uppercase text-xs truncate lg:col-span-5 font-bold ",
                    isPlaying && "text-black lg:text-white"
                  )}
                >
                  {detailsInfo?.brand.title}
                </p>
                <span>•</span>
              </>
            )}

            <p
              className={twMerge(
                "uppercase text-xs truncate lg:col-span-5 mr-2 ",
                isPlaying && "text-black lg:text-white"
              )}
            >
              {detailsInfo?.location_long}
            </p>
          </div>
          <div
            className={twMerge(
              "pl-4 text-xs lg:text-sm font-extrabold lg:font-normal justify-self-end lg:justify-self-auto",
              isPlaying && "text-black"
            )}
          >
            {currentAuditionDurationRange}
          </div>
        </div>
        <div className="grid grid-cols-2 w-full">
          <div
            className={twMerge(
              "relative pr-10 aspect-[2/1] lg:aspect-[3/2]  group cursor-pointer mx-3  mb-5 lg:m-0 box-border",
              isPlaying && ""
            )}
            onClick={() => toggleRadio(stationName)}
          >
            <Image
              src={detailsInfo.media.picture_medium_large}
              className="object-cover brightness-75 group-hover:brightness-50 transition"
              fill
              sizes="800px 800px"
              alt="cover image"
            />
            <div className={twMerge("absolute bottom-0 px-1 py-2 lg:bottom-3 lg:left-4 lg:text-white text-black bg-white lg:bg-transparent", isPlaying && "bg-transparent text-white")}>
              {isPlaying ? (
                <IoStopSharp size={60} className="h-7 lg:h-16"/>
              ) : (
                <IoPlaySharp size={60} className="h-7 lg:h-16"/>
              )}
            </div>
          </div>
          <div
            className={twMerge(
              "flex flex-col gap-3 lg:pt-9 pl-4 pr-8 md:pr-14",
              isPlaying && "bg-white"
            )}
          >
            <div
              className={twMerge(
                "text-xs sm:text-sm lg:text-xl font-extrabold uppercase line-clamp-2 sm:line-clamp-2",
                isPlaying && "text-black"
              )}
            >
              {detailsInfo.name}
            </div>
            <div
              className={twMerge(
                "text-xs sm:text-sm line-clamp-1 md:line-clamp-3",
                isPlaying && "text-black"
              )}
            >
              {detailsInfo.description}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex border-white border-y">
        <div className="border-r border-white ">
          <Link href={"/"} className="flex gap-2 items-center p-3 ">
            <span className=" text-sm font-extrabold uppercase whitespace-nowrap	">Next on </span>
            <PiCaretRightBold size={13} />
          </Link>
        </div>
        <div className="flex gap-2 items-center p-3">
          <div className="pl-2 text-sm whitespace-nowrap	">{nextAuditionDurationRange}</div>
          <div className="uppercase text-sm font-extrabold line-clamp-1 pr-2">
            {station.next.embeds.details.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioStationDescription;
