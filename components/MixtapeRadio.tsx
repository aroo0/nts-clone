"use client";
import usePlayer from "@/stores/usePlayer";
import { useEffect, useState, useRef } from "react";
import { PhPlayFill, PhStopFill, PhXBold } from "./Icons";
import { twMerge } from "tailwind-merge";
import useRadioToggle from "@/hooks/useRadioToggle";
import Spiner from "./Spiner";

const MixtapeRadio = () => {
  const { activePlayer } = usePlayer();
  const vidRef = useRef(null);

  const { stopRadio, togglePause } = useRadioToggle();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!vidRef || !vidRef.current) {
      return;
    }

    if (activePlayer.pause) {
      (vidRef.current! as HTMLVideoElement).pause();
    } else {
      (vidRef.current! as HTMLVideoElement).play();
    }
  }, [activePlayer, vidRef]);

  useEffect(() => {
    if (activePlayer.type === "mixtape" && activePlayer.pause === false) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [activePlayer]);

  return (
    <div
      className={twMerge(
        "fixed bottom-0 z-[100] flex h-[61px] w-full translate-y-0 items-center gap-2 border-t-2 border-white bg-black transition lg:w-[860px] lg:border-r-2 ",
        activePlayer.type !== "mixtape" &&
          "translate-y-[61px] transition duration-100 ",
      )}
    >
      {activePlayer.type === "mixtape" && (
        <>
          <div className="h-[60px] w-[60px]">
            <video
              loop
              controls={false}
              muted
              width="60"
              height="60"
              poster={activePlayer.info?.image}
              ref={vidRef}
              src={activePlayer.info?.animation}
            ></video>
          </div>
          <button
            className="flex h-[60px] w-[30px] items-center justify-center"
            onClick={() => togglePause()}
          >
            {isPlaying ? (
              activePlayer.isLoadingAudio === "unloaded" ? (
                <Spiner size="h-[22px] w-[22px]" color="text-white" />
              ) : (
                <PhStopFill className="h-10 w-10 fill-white lg:h-14 lg:w-14" />
              )
            ) : (
              <PhPlayFill className="h-[25px] w-[25px] fill-white" />
            )}
          </button>
          <div className="flex h-[60px] flex-1 flex-col justify-center">
            <span className="font-extrabold uppercase leading-4">
              {activePlayer.stationName}
            </span>
            <span className="line-clamp-1 text-xs">
              {activePlayer.info?.subtitle}
            </span>
          </div>
          <button
            className="flex h-[60px] w-[40px] items-center justify-center border-white sm:w-[60px] sm:border-l"
            onClick={() => stopRadio()}
          >
            <PhXBold className="h-[23px] w-[23px] fill-white" />
          </button>
        </>
      )}
    </div>
  );
};

export default MixtapeRadio;
