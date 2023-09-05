"use client";
import { Episode } from "@/types/shows";
import EpisodeItem from "./EpisodeItem";
import {
  elClassName,
  TBearSlideItemDataList,
  BearSlideCard,
  // @ts-ignore
} from "bear-react-carousel";
import "bear-react-carousel/dist/index.css";
import styled from "styled-components";
import { PhCaretLeftBold, PhCaretRightBold } from "./Icons";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import dynamic from "next/dynamic";

const BearCarousel = dynamic(
  // @ts-ignore
  () => import("bear-react-carousel").then((mod) => mod),
  { ssr: false },
);

interface SliderFeedProps {
  data: Episode[];
  library: {
    title: string;
    subtitle: string;
    alias: string;
  };
}

const SliderFeed: React.FC<SliderFeedProps> = ({ data, library }) => {
  let episodes: TBearSlideItemDataList = data.map((episode, index) => {
    return {
      key: index,
      children: (
        <BearSlideCard key={index} className={twMerge(index === 0 && "lg:pl-7")}>
          <EpisodeItem data={episode} />
        </BearSlideCard>
      ),
    };
  });

  const viewAll = {
    key: "ViewAll",
    children: (
      <BearSlideCard className="pr-7">
        <div className="flex h-full flex-col items-center justify-center border  border-neutral-600 p-2">
          <Link
            href={`/${library.alias}`}
            className="text-sm font-extrabold uppercase transition hover:opacity-70 focus:opacity-70"
          >
            View All
          </Link>
        </div>
      </BearSlideCard>
    ),
  };

  episodes = [...episodes, viewAll];

  return (
    <div>
      <div className="my-3 flex flex-col gap-1  pb-4 px-4 lg:px-10 lg:mt-3">
        <div className="flex items-end gap-4">
          <h1 className="text-xl font-extrabold uppercase">{library.title}</h1>
          <Link
            className="mb-0.5 flex items-center gap-1 text-xs uppercase transition hover:opacity-70 focus:opacity-70"
            href={`/${library.alias}`}
          >
            <span>View All</span>
            <PhCaretRightBold className="h-3 w-3" />
          </Link>
        </div>
        <p className="text-sm">{library.subtitle}</p>
      </div>
      <BearCarousel
        // @ts-ignore
        data={episodes}
        height="400px"
        isEnableNavButton
        isEnablePagination={false}
        isEnableMouseMove={false}
        spaceBetween={20}
        // @ts-ignore
        renderNavButton={(toPrev, toNext) => {
          return (
            <div className={elClassName.navGroup}>
              <CustomButton
                type="button"
                className={elClassName.navPrevButton}
                onClick={toPrev}
              >
                <div>
                  <PhCaretLeftBold className="h-6 w-6  " />
                </div>
              </CustomButton>
              <CustomButton
                type="button"
                className={elClassName.navNextButton}
                onClick={toNext}
              >
                <div>
                  <PhCaretLeftBold className="h-6 w-6" />
                </div>
              </CustomButton>
            </div>
          );
        }}
        slidesPerView={1}
        slidesPerGroup={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 2,
          },
          1280: {
            slidesPerView: 4,
            slidesPerGroup: 3,
          },
          1536: {
            slidesPerView: 5,
            slidesPerGroup: 4,
          },
        }}
      />
    </div>
  );
};

const CustomButton = styled.button`
  &.${elClassName.navPrevButton}, &.${elClassName.navNextButton} {
    color: white;
    height: 100%;
    width: 60px;
    justify-content: start;
  }

  @media (min-width: 1025px) {
    &.${elClassName.navPrevButton}, &.${elClassName.navNextButton} {
      background: linear-gradient(to left, transparent 0%, #000 100%);

    }


  &.${elClassName.navPrevButton} > *,
  &.${elClassName.navNextButton} > * {
    background: transparent;
    display: flex;
    height: 48px;
    width: 40px;
    align-items: center;
    padding-left: 8px;
  }

  &.${elClassName.navPrevButton}:hover > *,
  &.${elClassName.navNextButton}:hover > * {
    background-color: white;
    color: black;
    transition: 0.5s ease;
  }

  &.${elClassName.navPrevButton} {
    left: 0;
  }

  &.${elClassName.navNextButton} {
    right: 0;
  }


`;

export default SliderFeed;
