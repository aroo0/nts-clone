"use client"

import { Mixtape } from "@/types/mixtapes";
import Image from "next/image";
import Link from "next/link";
import { PhCaretRightBold, PhPlayFill, PhStopFill } from "./Icons";
import { useEffect, useState } from "react";
import useRadioToggle from "@/hooks/useRadioToggle";
import usePlayer from "@/stores/usePlayer";

interface MixtapeItemProps {
  data: Mixtape;
}

const MixtapeItem: React.FC<MixtapeItemProps> = ({ data }) => {
  const { toggleRadio } = useRadioToggle();
  const { activePlayer } = usePlayer();

  const [isPlaying, setIsPlaying] = useState(false);

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


  return (
    <article className="group relative flex items-center gap-6 border-b border-neutral-600 p-2  lg:gap-0 lg:odd:border-l lg:odd:border-r lg:even:border-r">
      <div
        style={{
          backgroundImage: `url(${data.media.picture_medium})`,
        }}
        className=" absolute m-auto h-[95px] w-[95px] bg-cover bg-center bg-no-repeat opacity-50 delay-100 duration-200 ease-in group-hover:opacity-30	lg:h-[164px]	lg:w-[97%]	"
      />
      <Link
        className="duration-400 peer z-[20] order-last h-full w-full pr-8 transition"
        href={`/infinite-mixtapes/${data.mixtape_alias}`}
      >
        <div className="flex h-full flex-col justify-center gap-4">
          <div className="ease group flex items-center justify-between gap-3 transition duration-300 lg:translate-y-[20px] lg:justify-start lg:group-hover:translate-y-[0px]">
            <div className="flex items-center gap-5 lg:gap-3 ">
              <div className="relative z-0 h-6 w-6  ">
                <Image
                  src={data.media.icon_white}
                  alt="Mixtape icon"
                  fill
                  sizes="50px 50px"
                />
              </div>
              <h2 className="z-[3] text-base font-extrabold uppercase sm:text-lg xl:text-xl ">
                {data.title}
              </h2>
            </div>
            <PhCaretRightBold className="ease transition-500 h-[24px] w-[24px] fill-white transition lg:opacity-0 lg:group-hover:opacity-100" />
          </div>
          <p className="ease z-[3] hidden h-[20px] translate-y-[0px] text-sm opacity-0 transition delay-100 duration-300 lg:block lg:group-hover:translate-y-[-10px] lg:group-hover:opacity-100">
            {" "}
            {data.subtitle}
          </p>
        </div>
      </Link>
      <button
        className="duration-400 relative z-[3] flex aspect-square h-[95px] w-[95px] items-center justify-center text-white  transition peer-hover:text-neutral-600 lg:h-[160px] lg:w-[160px] lg:hover:scale-125"
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
          <PhStopFill className="h-10 w-10 fill-white lg:h-14 lg:w-14" />
        ) : (
          <PhPlayFill className="h-10 w-10 fill-white lg:h-14 lg:w-14" />
        )}
      </button>
    </article>
  );
};

export default MixtapeItem;
