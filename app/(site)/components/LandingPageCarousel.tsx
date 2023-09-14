"use client";
import "bear-react-carousel/dist/index.css";

import {
  TBearSlideItemDataList,
  elClassName,
  BearSlideCard,
  Controller,
  ICarouselState,
  // @ts-ignore
} from "bear-react-carousel";
import dynamic from "next/dynamic";
import {
  PhCaretLeftBold,
  PhCaretRightBold,
  PhPlayFill,
  PhStopFill,
} from "@/components/Icons";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Episode } from "@/types/shows";
import SliderEpisodeItem from "./SliderEpisodeItem";


const BearCarousel = dynamic(
  // @ts-ignore
  () => import("bear-react-carousel").then((mod) => mod),
  { ssr: false },
);

interface LandingPageCarouselProps {
  initData: Episode[]
}

const LandingPageCarousel: React.FC<LandingPageCarouselProps> = ({initData}) => {
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [controller, setController] = useState<Controller>();
  const [carouselState, setCarouselState] = useState<ICarouselState>();

  const bearSlideItemData: TBearSlideItemDataList = initData.map((episode) => {
    return {
      key: episode.episode_alias,
      children: (
        <SliderEpisodeItem episodeData={episode} />
      ),
    };
  });


  return (
    <div className="h-full w-full relative">
      <BearCarousel
        // @ts-ignore
        slidesPerView={1}
        slidesPerGroup={1}
        data={bearSlideItemData}
        height="w-full"
        isEnableNavButton
        isEnableMouseMove={false}
        className="relative"
        isEnableAutoPlay={isAutoPlay}
        isEnableLoop
        autoPlayTime={4000}
        onSlideChange={setCarouselState}
        setController={setController}
        // @ts-ignore
        renderNavButton={(toPrev, toNext) => {
          return (
            <div className="absolute bottom-16 right-12 z-[10] flex gap-2 ">
              <button
                type="button"
                className="text-white transition hover:text-neutral-400"
                onClick={toPrev}
              >
                <div>
                  <PhCaretLeftBold className="h-4 w-4" />
                </div>
              </button>
              <button
                className="text-white transition hover:text-neutral-400"
                onClick={() => {
                  setIsAutoPlay((prev) => !prev);
                }}
              >
                {isAutoPlay ? (
                  <PhStopFill className="h-3 w-3" />
                ) : (
                  <PhPlayFill className="h-3 w-3" />
                )}
              </button>
              <button
                type="button"
                className="text-white transition hover:text-neutral-400"
                onClick={toNext}
              >
                <div>
                  <PhCaretRightBold className="h-4 w-4" />
                </div>
              </button>
            </div>
          );
        }}
      />
      <div className="absolute bottom-14 left-6 flex items-center gap-2 z-[10]">
        <div className="flex ">
          {Array.from({ length: 12 }).map((_, index) => (
            <span
              key={index}
              className={twMerge(
                `h-[2px] w-[calc(600px/12)] bg-neutral-500 transition`,
                index === carouselState?.page.activePage - 1 && "bg-white",
              )}
            />
          ))}
        </div>
        <span className="text-xs text-neutral-200">
          {carouselState?.page.activePage} / {carouselState?.page.total}
        </span>
      </div>
    </div>
  );
};


export default LandingPageCarousel;
