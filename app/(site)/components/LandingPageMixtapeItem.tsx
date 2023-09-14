"use client";

import { Mixtape } from "@/types/mixtapes";
import Image from "next/image";
import Link from "next/link";
import { PhCaretRightBold, PhPlayFill, PhStopFill } from "@/components/Icons";
import { useEffect, useState } from "react";
import useRadioToggle from "@/hooks/useRadioToggle";
import usePlayer from "@/stores/usePlayer";

interface LandingPageMixtapeItemProps {
  data: Mixtape;
}

const LandingPageMixtapeItem: React.FC<LandingPageMixtapeItemProps> = ({
  data,
}) => {
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
    <article className="group relative flex flex-col justify-between border-b border-l border-t border-neutral-700 p-3 py-4  odd:border-r even:border-r ">
      <div
        style={{
          backgroundImage: `url(${data.media.picture_medium})`,
        }}
        className="absolute inset-0  m-auto w-[96%] h-[95%] bg-cover bg-center bg-no-repeat opacity-50 delay-100 duration-200 ease-in group-hover:opacity-30"
      />

      <Link
        className="duration-400 w-fulltransition peer z-[20] order-last h-full pr-2"
        href={`/infinite-mixtapes/${data.mixtape_alias}`}
      >
        <div className="flex h-full flex-col justify-center gap-4">
          <div className="ease group flex translate-y-[60px] items-center justify-start gap-1 transition duration-500 group-hover:translate-y-[20px]">
            <div className="flex items-center gap-1 ">
              <div className="relative z-0 h-5 w-5  ">
                <Image
                  src={data.media.icon_white}
                  alt="Mixtape icon"
                  fill
                  className=""
                />
              </div>
              <h2 className="z-[3]  text-sm font-extrabold uppercase   ">
                {data.title}
              </h2>
            </div>
            <PhCaretRightBold className="ease transition-500 h-3 w-3 fill-white transition lg:opacity-0 lg:group-hover:opacity-100" />
          </div>
          <p className="ease z-[3]  line-clamp-2 translate-y-[20px] text-xs opacity-0 transition delay-100  duration-300 group-hover:translate-y-[10px] group-hover:opacity-100">
            {data.subtitle}
          </p>
        </div>
      </Link>
      <button
        className="duration-400 relative z-[3] flex aspect-square h-4 w-4 items-center justify-center text-white transition peer-hover:text-neutral-600  lg:hover:scale-125"
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
          <PhStopFill className="h-4 w-4 fill-white " />
        ) : (
          <PhPlayFill className="h-4 w-4 fill-white " />
        )}
      </button>
    </article>
  );
};

export default LandingPageMixtapeItem;
